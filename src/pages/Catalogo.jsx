import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingCart, CheckCircle, Filter, X } from 'lucide-react';

const Catalogo = ({
  productosIniciales = [],
  agregarAlCarrito,
  onSelectProducto
}) => {
  // --- DETECCIÓN DE TIPO DE INVENTARIO ---
  // Detectamos si este catálogo es de Hot Wheels para adaptar los filtros
  const esHotWheels = useMemo(() => 
    productosIniciales.some(p => p.categoria === 'Hot Wheels'), 
  [productosIniciales]);

  // --- ESTADOS DE FILTROS ---
  const [busqueda, setBusqueda] = useState("");
  
  // Filtro Marca (Antes marcaVehiculo) - Aplica a todos
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  
  // Filtro Fabricante - Solo para Autos y Motos
  const [fabricantesSeleccionados, setFabricantesSeleccionados] = useState([]); 
  
  // Filtro Serie - Solo para Hot Wheels (Basicos, Silver, Premium)
  const [seriesSeleccionadas, setSeriesSeleccionadas] = useState([]);

  const [escalasSeleccionadas, setEscalasSeleccionadas] = useState([]);
  
  // Filtro Disponibilidad - Ahora con dos items
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState({
    disponibles: false,
    agotados: false
  });
  
  const [mostrarFiltrosMovil, setMostrarFiltrosMovil] = useState(false);

  // Limpiar filtros al cambiar de inventario
  useEffect(() => {
    setMarcasSeleccionadas([]);
    setFabricantesSeleccionados([]);
    setSeriesSeleccionadas([]);
    setEscalasSeleccionadas([]);
    setFiltroDisponibilidad({ disponibles: false, agotados: false });
    setBusqueda("");
  }, [productosIniciales]);

  // --- 1. EXTRAER OPCIONES ÚNICAS ---
  
  // Marca (Global) - Reemplaza marcaVehiculo
  const marcasDisponibles = useMemo(() => 
    [...new Set(productosIniciales.map(p => p.marca || "Otras"))].sort(), 
  [productosIniciales]);

  // Fabricante (Solo Autos/Motos)
  const fabricantesDisponibles = useMemo(() => 
    esHotWheels ? [] : [...new Set(productosIniciales.map(p => p.fabricante))].sort(), 
  [productosIniciales, esHotWheels]);

  // Series (Solo Hot Wheels)
  const seriesDisponibles = useMemo(() => 
    esHotWheels ? ["Basicos", "Silver Series", "Premium"] : [], 
  [esHotWheels]);

  const escalasDisponibles = useMemo(() => 
    [...new Set(productosIniciales.map(p => p.escala))].sort(), 
  [productosIniciales]);

  // --- 2. HELPERS ---
  const toggleFiltro = (item, listaActual, setLista) => {
    if (listaActual.includes(item)) {
      setLista(listaActual.filter(i => i !== item));
    } else {
      setLista([...listaActual, item]);
    }
  };

  const toggleDisponibilidad = (tipo) => {
    setFiltroDisponibilidad(prev => ({
      ...prev,
      [tipo]: !prev[tipo]
    }));
  };

  // --- 3. LÓGICA DE FILTRADO ---
  const productosProcesados = productosIniciales.filter(p => {
    // Texto
    const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    
    // 1. Marca (Global)
    const marcaProd = p.marca || "Otras";
    const coincideMarca = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(marcaProd);

    // 2. Fabricante (No aplica en Hot Wheels)
    const coincideFabricante = esHotWheels 
        ? true 
        : (fabricantesSeleccionados.length === 0 || fabricantesSeleccionados.includes(p.fabricante));

    // 3. Serie (Solo Hot Wheels)
    const coincideSerie = !esHotWheels
        ? true
        : (seriesSeleccionadas.length === 0 || (p.serie && seriesSeleccionadas.includes(p.serie)));

    // 4. Escala
    const coincideEscala = escalasSeleccionadas.length === 0 || escalasSeleccionadas.includes(p.escala);

    // 5. Disponibilidad (Dos items: Disponibles, Agotados)
    // Si ninguno está seleccionado, mostramos todos. Si ambos, todos. Si uno, filtramos.
    let coincideStock = true;
    if (filtroDisponibilidad.disponibles && !filtroDisponibilidad.agotados) {
        coincideStock = p.stock > 0;
    } else if (!filtroDisponibilidad.disponibles && filtroDisponibilidad.agotados) {
        coincideStock = p.stock === 0;
    }

    return coincideTexto && coincideMarca && coincideFabricante && coincideSerie && coincideEscala && coincideStock;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 animate-fade-in font-sans">
      
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR FILTROS */}
        <aside className={`
            lg:w-1/4 lg:block 
            ${mostrarFiltrosMovil ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'}
        `}>
            <div className="flex justify-between items-center lg:hidden mb-6">
                <span className="font-bold text-xl">Filtros</span>
                <button onClick={() => setMostrarFiltrosMovil(false)}><X /></button>
            </div>

            <div className="space-y-8 pr-4">
                
                {/* 1. DISPONIBILIDAD (2 Items) */}
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Disponibilidad</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filtroDisponibilidad.disponibles ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                {filtroDisponibilidad.disponibles && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={filtroDisponibilidad.disponibles} onChange={() => toggleDisponibilidad('disponibles')} />
                            <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">Disponibles</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filtroDisponibilidad.agotados ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                {filtroDisponibilidad.agotados && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={filtroDisponibilidad.agotados} onChange={() => toggleDisponibilidad('agotados')} />
                            <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">Agotados</span>
                        </label>
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* 2. ESCALA */}
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Escala</h3>
                    <div className="space-y-2">
                        {escalasDisponibles.map(escala => (
                            <label key={escala} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${escalasSeleccionadas.includes(escala) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                    {escalasSeleccionadas.includes(escala) && <CheckCircle size={14} className="text-white" />}
                                </div>
                                <input type="checkbox" className="hidden" checked={escalasSeleccionadas.includes(escala)} onChange={() => toggleFiltro(escala, escalasSeleccionadas, setEscalasSeleccionadas)} />
                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{escala}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* 3. MARCA (Ex-MarcaVehiculo) - GLOBAL */}
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Marca</h3>
                    <div className="space-y-2">
                        {marcasDisponibles.map(marca => (
                            <label key={marca} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${marcasSeleccionadas.includes(marca) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                    {marcasSeleccionadas.includes(marca) && <CheckCircle size={14} className="text-white" />}
                                </div>
                                <input type="checkbox" className="hidden" checked={marcasSeleccionadas.includes(marca)} onChange={() => toggleFiltro(marca, marcasSeleccionadas, setMarcasSeleccionadas)} />
                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{marca}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* 4. LÓGICA CONDICIONAL: FABRICANTE vs SERIE */}
                
                {esHotWheels ? (
                    /* FILTRO SERIE (Solo Hot Wheels) */
                    <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Tipo</h3>
                        <div className="space-y-2">
                            {seriesDisponibles.map(serie => (
                                <label key={serie} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${seriesSeleccionadas.includes(serie) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                        {seriesSeleccionadas.includes(serie) && <CheckCircle size={14} className="text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={seriesSeleccionadas.includes(serie)} onChange={() => toggleFiltro(serie, seriesSeleccionadas, setSeriesSeleccionadas)} />
                                    <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{serie}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* FILTRO FABRICANTE (Motos/Autos) */
                    <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Fabricante</h3>
                        <div className="space-y-2">
                            {fabricantesDisponibles.map(fabricante => (
                                <label key={fabricante} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${fabricantesSeleccionados.includes(fabricante) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                        {fabricantesSeleccionados.includes(fabricante) && <CheckCircle size={14} className="text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={fabricantesSeleccionados.includes(fabricante)} onChange={() => toggleFiltro(fabricante, fabricantesSeleccionados, setFabricantesSeleccionados)} />
                                    <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{fabricante}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </aside>

        {/* CONTENIDO DERECHO */}
        <div className="lg:w-3/4 flex flex-col w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <button onClick={() => setMostrarFiltrosMovil(true)} className="lg:hidden w-full flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl font-bold">
                    <Filter size={18} /> Filtrar
                </button>
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:border-slate-900 outline-none" />
                </div>
                <p className="text-slate-500 font-medium text-sm whitespace-nowrap">{productosProcesados.length} productos</p>
            </div>

            {productosProcesados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {productosProcesados.map((producto, index) => {
                        const tieneStock = producto.stock > 0;
                        // Usamos una key única combinada para seguridad en renderizado
                        const uniqueKey = `${producto.categoria}-${producto.id}-${index}`;
                        
                        return (
                            <div
                                key={uniqueKey}
                                onClick={() => onSelectProducto?.(producto)} // Pasamos el OBJETO entero
                                className="group bg-white rounded-xl border border-slate-100 hover:shadow-xl flex flex-col overflow-hidden cursor-pointer relative"
                            >
                                <div className="relative h-60 bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
                                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded border border-slate-200 z-10 text-slate-600">{producto.escala}</span>
                                    <img src={producto.imagenes?.principal} alt={producto.nombre} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" onError={(e) => e.currentTarget.src = "/img/placeholder.png"} />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-center mb-2">
                                        {tieneStock ? (
                                            <span className="text-[12.2px] font-extrabold text-green-600 uppercase bg-green-50 px-0 py-0.5 rounded">Disponible</span>
                                        ) : (
                                            <span className="text-[12.2px] font-extrabold text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded">Agotado</span>
                                        )}
                                        {/* CONDICIONAL DE UI: Si es Hot Wheels mostramos la SERIE, si no, el FABRICANTE */}
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {esHotWheels ? producto.serie : producto.fabricante}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 leading-tight mb-4 group-hover:text-red-600 transition-colors line-clamp-2">{producto.nombre}</h3>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-xl font-black text-slate-900">${producto.precio.toFixed(2)}</span>
                                        <button disabled={!tieneStock} onClick={(e) => { e.stopPropagation(); if (tieneStock) agregarAlCarrito(producto); }} className={`p-2.5 rounded-lg transition-all shadow-sm ${tieneStock ? 'bg-slate-900 text-white hover:bg-red-600' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}>
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-500 font-medium">No hay productos que coincidan con los filtros.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;