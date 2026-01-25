import React, { useState } from 'react';
import Navbar from './components/BarraNavegacion'; 
import CartDrawer from './components/CarritoLateral'; 
import Home from './pages/Inicio';
import Catalog from './pages/Catalogo';
import Pruebas from './pages/Pruebas';
import ProductoDetalle from "./pages/ProductoDetalle";
import Footer from "./components/Footer";

import { useCarrito } from './hooks/useCarrito';

// 1. IMPORTAR ARCHIVOS INDEPENDIENTES
import { INVENTARIO_MOTOS } from "./data/InventarioMotos";
import { INVENTARIO_AUTOS } from "./data/InventarioAutos";
import { INVENTARIO_HOTWHEELS } from "./data/InventarioHotwheels";

// Combinado solo para Home (Destacados) y búsquedas globales si las hubiera
const PRODUCTOS_COMBINADOS = [
  ...INVENTARIO_MOTOS,
  ...INVENTARIO_AUTOS,
  ...INVENTARIO_HOTWHEELS
];

function App() {
  const [vistaActual, setVistaActual] = useState("inicio");
  
  // 2. CAMBIO LÓGICA: Guardamos el OBJETO producto, no solo el ID
  // Esto soluciona el conflicto de IDs duplicados entre inventarios
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const { 
    carrito, isCarritoAbierto, setIsCarritoAbierto, agregarAlCarrito, 
    eliminarDelCarrito, actualizarCantidad, totalCarrito 
  } = useCarrito();

  const destacados = PRODUCTOS_COMBINADOS
    .filter(p => p.destacado === true)
    .slice(0, 8); 

  // Modificamos para recibir el objeto completo
  const abrirProducto = (producto) => {
    setProductoSeleccionado(producto);
    setVistaActual("producto");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const volverAlCatalogo = () => {
    if (!productoSeleccionado) return setVistaActual('inicio');
    // Redirigir según la categoría del objeto guardado
    if (productoSeleccionado.categoria === 'Moto') setVistaActual('motos');
    else if (productoSeleccionado.categoria === 'Auto') setVistaActual('autos');
    else if (productoSeleccionado.categoria === 'Hot Wheels') setVistaActual('hotwheels');
    else setVistaActual('inicio');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar 
        carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
        onOpenCart={() => setIsCarritoAbierto(true)}
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
      />
      
      <main className="flex-grow">
        {vistaActual === 'inicio' && (
          <Home 
            setVistaActual={setVistaActual} 
            productos={destacados}
            agregarAlCarrito={agregarAlCarrito}
            onSelectProducto={abrirProducto} // Pasamos la función actualizada
          />
        )}
        
        {/* Pasamos los inventarios separados */}
        {vistaActual === 'motos' && (
           <Catalog 
             productosIniciales={INVENTARIO_MOTOS}
             titulo="Motos a Escala"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {vistaActual === 'autos' && (
           <Catalog 
             productosIniciales={INVENTARIO_AUTOS}
             titulo="Autos a Escala"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {vistaActual === 'hotwheels' && (
           <Catalog 
             productosIniciales={INVENTARIO_HOTWHEELS}
             titulo="Hot Wheels"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {vistaActual === 'pruebas' && (
           <Pruebas setVistaActual={setVistaActual} />
        )}

        {vistaActual === "producto" && (
          <ProductoDetalle
            producto={productoSeleccionado}
            onVolver={volverAlCatalogo}
            agregarAlCarrito={agregarAlCarrito}
          />
        )}
      </main>

      <CartDrawer
        abierto={isCarritoAbierto}
        cerrar={() => setIsCarritoAbierto(false)}
        carrito={carrito}
        total={totalCarrito}
        eliminarItem={eliminarDelCarrito}
        actualizarCantidad={actualizarCantidad}
      />
      <Footer setVistaActual={setVistaActual} />
      {/* ... Botón Whatsapp ... */}
    </div>
  );
}

export default App;