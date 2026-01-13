import React from 'react';
import { ArrowRight } from 'lucide-react';



const Inicio = ({ setVistaActual }) => {
  return (
    <div className="animate-fade-in">
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1614165936126-2ed18e471b10?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Banner Moto" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 lg:flex lg:items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
              Nuevos modelos 2024
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Coleccionismo <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Sin Límites.</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-lg">
              Especialistas en modelos a escala 1:12 y 1:18. La mejor calidad de Maisto, Bburago y Tamiya directamente a tu vitrina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setVistaActual('catalogo')} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 cursor-pointer">
                Ver Catálogo <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => setVistaActual('contacto')} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/10 cursor-pointer">
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-12 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div>
                <h3 className="font-bold text-xl text-slate-900">Envíos a todo el Ecuador</h3>
                <p className="text-slate-500 text-sm">Por Servientrega o Cooperativas de transporte</p>
             </div>
             <div>
                <h3 className="font-bold text-xl text-slate-900">Pagos Seguros</h3>
                <p className="text-slate-500 text-sm">Depósitos, transferencias o pagos en efectivo (contraentrega)</p>
             </div>
             <div>
                <h3 className="font-bold text-xl text-slate-900">Calidad Garantizada</h3>
                <p className="text-slate-500 text-sm">Productos originales y réplicas con acabados de alta calidad.</p>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Inicio;


