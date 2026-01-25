import React from "react";
import { Facebook, Instagram, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function Footer({ setVistaActual }) {
  
  const handleNavigation = (vista) => {
    setVistaActual(vista);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FooterLink = ({ text, vista }) => (
    <button 
      onClick={() => handleNavigation(vista)} 
      className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-base flex items-center gap-2 group py-1 w-full text-left"
    >
      <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100 flex-shrink-0">
        <ArrowRight size={16} className="text-red-500" />
      </span>
      {text}
    </button>
  );

  return (
    <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800 font-sans">
      
      {/* SECCIÓN PRINCIPAL - REDUCIDO de py-20 a py-16 */}
      <div className="max-w-6xl mx-auto px-6 py-16">  {/* py-20 (80px) → py-16 (64px) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">  {/* gap-12 → gap-10, lg:gap-20 → lg:gap-16 */}

          {/* 1. MARCA Y REDES - REDUCIDO space-y-8 a space-y-6 */}
          <div className="space-y-6">  {/* space-y-8 (32px) → space-y-6 (24px) */}
            <div>
                <h2 className="text-4xl font-black italic tracking-tighter text-white mb-3">  {/* mb-2 → mb-3 (12px) */}
                  FG<span className="text-red-600">STOREEC</span>
                </h2>
            </div>
            
            <p className="text-slate-300 text-base leading-relaxed max-w-sm">
              Vehículos a escala y varios productos mas. Compra fácil y rápido
            </p>

            <div className="flex gap-4">  {/* gap-5 → gap-4 (16px) */}
              <a
                href="https://www.facebook.com/fgstoreec"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-blue-500/20 hover:-translate-y-1"
              >
                <Facebook size={22} />
              </a>
              <a
                href="https://www.instagram.com/fgstoreec"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white transition-all duration-300 shadow-sm hover:shadow-red-500/20 hover:-translate-y-1"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.tiktok.com/@fgstoreec"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-black transition-all duration-300 shadow-sm hover:shadow-cyan-400/20 hover:-translate-y-1"
              >
                 <svg className="w-6 h-6 fill-current group-hover:text-[#00f2ea] transition-colors" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-1.84 4.83 4.83 0 0 1-1.17-3.03h-3.92v13.13a2.47 2.47 0 1 1-2.47-2.47c.23 0 .45.03.66.08v-3.99a6.44 6.44 0 1 0 6.43 6.44V9.5a8.75 8.75 0 0 0 4.24 1.1V6.69z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 2. EXPLORAR - REDUCIDO mb-8 a mb-6 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-red-600/30 pb-3 inline-block">  {/* mb-8 → mb-6 (24px) */}
              Explorar
            </h3>
            <div className="flex flex-col gap-3">  {/* gap-4 → gap-3 (12px) */}
              <FooterLink text="Inicio" vista="inicio" />
              <FooterLink text="Motos a Escala" vista="motos" />
              <FooterLink text="Autos a Escala" vista="autos" />
              <FooterLink text="HotWheels" vista="hotwheels" />
              <FooterLink text="Referencias de envíos" vista="pruebas" />
            </div>
          </div>

          {/* 3. CONTACTO - REDUCIDO space-y-6 a space-y-5 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-red-600/30 pb-3 inline-block">  {/* mb-8 → mb-6 (24px) */}
              Contacto
            </h3>
            <ul className="space-y-5">  {/* space-y-6 → space-y-5 (20px) */}
              <li className="flex items-start gap-4 text-slate-300 text-base">
                <div className="bg-slate-800/50 p-2 rounded-lg shrink-0">
                    <MapPin className="text-red-500" size={20} />
                </div>
                <span>
                  Quito, Ecuador.<br />
                  <span className="text-sm text-slate-400 font-medium">Envíos seguros a todo el país.</span>
                </span>
              </li>
              
              <li className="flex items-center gap-4 text-slate-300 text-base">
                <div className="bg-slate-800/50 p-2 rounded-lg shrink-0">
                    <Phone className="text-red-500" size={20} />
                </div>
                <span className="font-medium">095 886 6618</span>
              </li>

              <li className="flex items-center gap-4 text-slate-300 text-base">
                 <div className="bg-slate-800/50 p-2 rounded-lg shrink-0">
                    <Mail className="text-red-500" size={20} />
                 </div>
                <span className="font-medium">fgstoreec@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BARRA INFERIOR - REDUCIDO py-8 a py-6 */}
      <div className="bg-[#020617] py-6 border-t border-slate-800/50">  {/* py-8 → py-6 (24px) */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 font-medium">  {/* gap-6 → gap-4 (16px) */}
            <p className="text-center md:text-left">© 2026 FGSTOREEC. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">  {/* gap-6 → gap-4, md:gap-8 → md:gap-6 */}
              <button className="hover:text-white transition-colors whitespace-nowrap">Términos y Condiciones</button>
              <button className="hover:text-white transition-colors whitespace-nowrap">Política de Privacidad</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}