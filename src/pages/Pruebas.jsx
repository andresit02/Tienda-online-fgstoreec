import React from 'react';
import { Truck, CheckCircle, MapPin, Package, ArrowRight, ShieldCheck } from 'lucide-react';

// Datos simulados de envíos (En un futuro, podrías moverlos a src/data/envios.js)
const ENVIOS_REALIZADOS = [
  { id: 1, ciudad: "Quito, Pichincha", fecha: "15 Ene 2024", transporte: "Servientrega", img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=800" },
  { id: 2, ciudad: "Guayaquil, Guayas", fecha: "14 Ene 2024", transporte: "Tramaco", img: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=800" },
  { id: 3, ciudad: "Cuenca, Azuay", fecha: "12 Ene 2024", transporte: "Servientrega", img: "https://images.unsplash.com/photo-1620455041767-81766623bc2e?auto=format&fit=crop&q=80&w=800" },
  { id: 4, ciudad: "Ambato, Tungurahua", fecha: "10 Ene 2024", transporte: "Cooperativa", img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=800" },
  { id: 5, ciudad: "Manta, Manabí", fecha: "08 Ene 2024", transporte: "Servientrega", img: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=800" },
  { id: 6, ciudad: "Loja, Loja", fecha: "05 Ene 2024", transporte: "Servientrega", img: "https://images.unsplash.com/photo-1620455041767-81766623bc2e?auto=format&fit=crop&q=80&w=800" },
];

const Pruebas = ({ setVistaActual }) => {
  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} /> Compra 100% Segura
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Galería de <span className="text-red-600">Entregas</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
            La confianza se construye con hechos. Mira las guías de remisión de nuestros últimos envíos a coleccionistas en todo el Ecuador.
          </p>

          {/* Estadísticas de confianza */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Envíos Exitosos", val: "+500", icon: Package },
              { label: "Clientes Felices", val: "100%", icon: CheckCircle },
              { label: "Provincias", val: "24", icon: MapPin },
              { label: "Transportistas", val: "3", icon: Truck },
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center hover:shadow-md transition-shadow">
                <stat.icon className="w-6 h-6 text-red-500 mb-2" />
                <span className="text-2xl font-bold text-slate-900">{stat.val}</span>
                <span className="text-xs text-slate-500 font-medium uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GRID DE FOTOS DE GUÍAS */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ENVIOS_REALIZADOS.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              
              {/* Imagen (Foto de la guía) */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img 
                  src={item.img} 
                  alt={`Guía de envío a ${item.ciudad}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                />
                
                {/* Overlay al hacer hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <p className="text-white font-bold flex items-center gap-2">
                     <CheckCircle size={20} /> Verificado
                   </p>
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-slate-900 shadow-sm flex items-center gap-1">
                  <Truck size={12} /> {item.transporte}
                </div>
              </div>

              {/* Información del envío */}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <MapPin size={18} className="text-red-500" />
                      {item.ciudad}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 ml-6">Despachado el {item.fecha}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Entregado</span>
                  <span className="text-slate-400">ID: #GUIA-{202400 + item.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para volver */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">¿Listo para pedir tu modelo a escala?</h3>
          <button
            onClick={() => setVistaActual("catalogo")}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 active:scale-95 cursor-pointer"
          >
            Ver Catálogo <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Pruebas;