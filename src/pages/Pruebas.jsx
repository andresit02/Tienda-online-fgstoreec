import React from 'react';
import { Truck, CheckCircle, MapPin, Package, ArrowRight, ShieldCheck } from 'lucide-react';

// Fotos de envíos realizados (guías de remisión)
const ENVIOS_REALIZADOS = [
  { id: 1, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070384/WhatsApp_Image_2026-01-22_at_3.24.32_AM_1_zoelkp.jpg", ciudad: "Azogues", transporte: "Servientrega", guia: "1000548917"},
  { id: 2, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070385/WhatsApp_Image_2026-01-22_at_3.24.31_AM_iofgt2.jpg", ciudad: "Guayaquil", transporte: "Servientrega", guia: "1000557627" },
  { id: 3, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070385/WhatsApp_Image_2026-01-22_at_3.24.30_AM_1_epnffv.jpg", ciudad: "Cumanda", transporte: "Servientrega", guia: "1000557647"},
  { id: 4, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070384/WhatsApp_Image_2026-01-22_at_3.24.32_AM_g6ytzx.jpg", ciudad: "Piñas", transporte: "Servientrega", guia: "1000550887"},
  { id: 5, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070390/WhatsApp_Image_2026-01-22_at_3.24.25_AM_1_fk9chf.jpg", ciudad: "El Empalme", transporte: "Servientrega", guia: "1000548904"},
  { id: 6, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070388/WhatsApp_Image_2026-01-22_at_3.24.28_AM_uojvbb.jpg", ciudad: "Santo Domingo", transporte: "Servientrega", guia: "1000557642"},
  { id: 7, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070389/WhatsApp_Image_2026-01-22_at_3.24.26_AM_sjkbdg.jpg", ciudad: "Yantzaza", transporte: "Servientrega", guia: "1000548917"},
  { id: 8, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070390/WhatsApp_Image_2026-01-22_at_3.24.25_AM_xxqxy1.jpg", ciudad: "El Guabo", transporte: "Servientrega", guia: "1000550082"},
  { id: 9, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070392/WhatsApp_Image_2026-01-22_at_3.24.20_AM_u5dzoz.jpg", ciudad: "Ambato", transporte: "Servientrega", guia: "1000548921"},
  { id: 10, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070391/WhatsApp_Image_2026-01-22_at_3.24.20_AM_1_aht16o.jpg", ciudad: "Loja", transporte: "Servientrega", guia: "1000548911"},
  { id: 11, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070387/WhatsApp_Image_2026-01-22_at_3.24.29_AM_yczarw.jpg", ciudad: "Santa Rosa", transporte: "Servientrega", guia: "9020829699"},
  { id: 12, img: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070396/imgi_44_photo_5174977332010659829_y-dOqa41gz6GFZgoK7_vhgcrm.png", ciudad: "Zumba", transporte: "Servientrega", guia: "9021468959"},
];


const Pruebas = ({ setVistaActual }) => {
  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Referencias de <span className="text-red-600">Envíos</span>
          </h1>
          <p className="text-slate-500 text-lg mx-auto mb-8">
            La confianza se construye con hechos. Mira las guías de algunos de nuestros envíos a todo el Ecuador.
          </p>

          {/* Estadísticas de confianza */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Ventas realizadas", val: "+450", icon: Package },
              { label: "Clientes Felices", val: "100%", icon: CheckCircle },
              { label: "Provincias", val: "24", icon: MapPin },
              { label: "Medios de envío", val: "2", icon: Truck },
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
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >

              {/* Imagen */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.img}
                  alt={`Referencia de envío a ${item.ciudad}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay suave */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white font-semibold text-sm tracking-wide">
                    Referencia real de envío
                  </p>
                </div>

                {/* Transporte */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-slate-900 shadow-sm flex items-center gap-1">
                  <Truck size={12} /> {item.transporte}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin size={18} className="text-red-500" />
                  {item.ciudad}
                </h3>

                <p className="text-slate-600 text-sm font-semibold text-center mt-3 tracking-wide">
                  #GUIA: {item.guia}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pruebas;