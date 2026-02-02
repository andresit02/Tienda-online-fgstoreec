import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit, Plus, X, Save, Package, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

// URL DE TU BACKEND EN RENDER
const API_URL = 'https://tienda-online-fgstoreec-backend.onrender.com/api/productos';

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  
  // Estado para el formulario (Crear/Editar)
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: 'Motos',
    marca: '',
    imagenPrincipal: '',
    descripcion: ''
  });

  // 1. CARGAR PRODUCTOS
  const cargarProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
      setCargando(false);
    } catch (error) {
      toast.error('Error cargando productos');
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // 2. ELIMINAR PRODUCTO
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProductos(productos.filter(p => p.id !== id));
      toast.success('Producto eliminado');
    } catch (error) {
      toast.error('No se pudo eliminar');
    }
  };

  // 3. PREPARAR EDICIÓN
  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
      marca: producto.marca || '',
      imagenPrincipal: producto.imagenes?.principal || '',
      descripcion: producto.descripcion || ''
    });
    setMostrarFormulario(true);
  };

  // 4. GUARDAR (CREAR O EDITAR) --- CORREGIDO AQUÍ ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // CORRECCIÓN: Creamos el objeto limpio. NO usamos ...formData para evitar enviar campos basura.
    const datosParaEnviar = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      categoria: formData.categoria,
      marca: formData.marca,
      // Estructuramos la imagen como Prisma la espera
      imagenes: { 
        principal: formData.imagenPrincipal, 
        galeria: productoEditando?.imagenes?.galeria || [] 
      },
      // Mantenemos características si existen
      caracteristicas: productoEditando?.caracteristicas || [] 
    };

    try {
      if (productoEditando) {
        // EDITAR
        await axios.put(`${API_URL}/${productoEditando.id}`, datosParaEnviar);
        toast.success('Producto actualizado');
      } else {
        // CREAR NUEVO
        await axios.post(API_URL, datosParaEnviar);
        toast.success('Producto creado');
      }
      
      // Resetear y recargar
      setMostrarFormulario(false);
      setProductoEditando(null);
      setFormData({ nombre: '', precio: 0, stock: 0, categoria: 'Motos', marca: '', imagenPrincipal: '', descripcion: '' });
      cargarProductos();

    } catch (error) {
      console.error(error);
      toast.error('Error al guardar: ' + (error.response?.data?.error || 'Verifica los datos'));
    }
  };

  // Filtrado visual
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <div className="p-10 text-center">Cargando Panel...</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-900">
      
      <div className="max-w-7xl mx-auto">
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Panel Administrador</h1>
            <p className="text-slate-500">Gestiona tu inventario en tiempo real</p>
          </div>
          <button 
            onClick={() => { setProductoEditando(null); setMostrarFormulario(true); }}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition shadow-lg"
          >
            <Plus size={20} /> Nuevo Producto
          </button>
        </div>

        {/* BUSCADOR */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-2 border border-slate-200">
          <Search className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar producto..." 
            className="w-full outline-none"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* MODAL / FORMULARIO FLOTANTE */}
        {mostrarFormulario && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                <button onClick={() => setMostrarFormulario(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">Nombre del Producto</label>
                  <input required className="w-full border p-2 rounded-lg" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Precio ($)</label>
                  <input type="number" step="0.01" required className="w-full border p-2 rounded-lg" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Stock</label>
                  <input type="number" required className="w-full border p-2 rounded-lg" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Categoría</label>
                  <select className="w-full border p-2 rounded-lg" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})}>
                    <option value="Motos">Motos</option>
                    <option value="Autos">Autos</option>
                    <option value="Hot Wheels">Hot Wheels</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Marca / Fabricante</label>
                  <input className="w-full border p-2 rounded-lg" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">URL de la Imagen Principal</label>
                  <input required placeholder="https://..." className="w-full border p-2 rounded-lg" value={formData.imagenPrincipal} onChange={e => setFormData({...formData, imagenPrincipal: e.target.value})} />
                  {formData.imagenPrincipal && <img src={formData.imagenPrincipal} alt="Previsualización" className="mt-2 h-20 object-contain border rounded" />}
                </div>
                
                <div className="col-span-2">
                    <label className="block text-sm font-bold mb-1">Descripción</label>
                    <textarea className="w-full border p-2 rounded-lg" rows="3" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})}></textarea>
                </div>

                <div className="col-span-2 mt-4 flex gap-3">
                  <button type="button" onClick={() => setMostrarFormulario(false)} className="flex-1 py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200">Cancelar</button>
                  <button type="submit" className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 flex justify-center items-center gap-2">
                    <Save size={18} /> Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TABLA DE PRODUCTOS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Producto</th>
                  <th className="px-6 py-4">Categoría</th>
                  <th className="px-6 py-4">Precio</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {productosFiltrados.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={prod.imagenes?.principal} className="w-10 h-10 object-contain bg-white rounded border" alt="" />
                      <span className="font-bold">{prod.nombre}</span>
                    </td>
                    <td className="px-6 py-4">{prod.categoria}</td>
                    <td className="px-6 py-4 font-bold">${prod.precio}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${prod.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {prod.stock} un.
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => abrirEditar(prod)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                        <button onClick={() => handleEliminar(prod.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;