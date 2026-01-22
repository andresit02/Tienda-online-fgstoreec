export const PRODUCTOS = [
  // --- MOTO (Existente) ---
  {
    id: 1,
    nombre: "YAMAHA YZF - R1 2021",
    marca: "Maisto",
    marcaVehiculo: "Yamaha",
    escala: "1:12",
    precio: 35,
    tipo: "Moto",          // CLAVE PARA SECCIONAR
    stock: 1,              // CLAVE PARA ESTADO ( >0 Disponible, 0 Agotado)
    destacado: true,       // CLAVE PARA HOME
    imagenes: {
      principal:
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769095533/D_NQ_NP_2X_629279-MLU73267337297_122023-F_qp3zhr.webp",
      galeria: [
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769093097/D_NQ_NP_2X_817921-MLU73267337305_122023-F_b8wdhr.webp",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769093097/D_NQ_NP_2X_927453-MLU77888111756_082024-F_fn8kst.webp",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769095472/imgi_13_w_1200_h_1200_fit_cover_vodul1.png",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769095472/imgi_14_w_1200_h_1200_fit_cover_s0l5jx.png",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769095472/imgi_10_w_1200_h_1200_fit_cover_wlvwoc.png",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769095472/imgi_11_w_1200_h_1200_fit_cover_bm1cok.png",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769095472/imgi_16_w_1200_h_1200_fit_pad_ohaax8.png"
      ]
    },
    
    descripcion: "Producto con licencia oficial y empaque original",

    caracteristicas: [
      "El manubrio gira de lado a lado",
      "Suspensión trasera funcional",
      "Ruedas totalmente funcionales",
      "Pata de apoyo lateral",
      "Incluye base de exhibición"
    ],

    materiales: "Metal fundido a presión con piezas de plástico y llantas de goma",

    medidasCaja: {
      texto: "22.3 × 8.8 × 14 cm",
      largo: 22.3,
      ancho: 8.8,
      alto: 14
    }
  },

  // --- AUTO (Nuevo para validar) ---
  {
    id: 2,
    nombre: "Ford Mustang GT 1967",
    marca: "Maisto",
    marcaVehiculo: "Ford",
    escala: "1:18",
    precio: 45,
    tipo: "Auto",          // SECCIÓN AUTOS
    stock: 0,              // PRUEBA DE AGOTADO
    destacado: true,
    imagenes: {
      principal: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600", 
      galeria: []
    },
    descripcion: "Clásico americano con apertura de puertas y capó.",
    caracteristicas: ["Apertura de puertas", "Dirección funcional"],
    materiales: "Diecast metal",
    medidasCaja: { texto: "30 x 12 x 12 cm" }
  },

  // --- HOT WHEELS (Nuevo para validar) ---
  {
    id: 3,
    nombre: "Twin Mill III",
    marca: "Hot Wheels",
    marcaVehiculo: "Hot Wheels",
    escala: "1:64",
    precio: 5.50,
    tipo: "Hot Wheels",    // SECCIÓN HW
    stock: 20,
    destacado: true,      // NO SALE EN HOME
    imagenes: {
      principal: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=600",
      galeria: []
    },
    descripcion: "Modelo icónico de colección básica.",
    caracteristicas: ["Rodamiento libre"],
    materiales: "Metal y plástico",
    medidasCaja: { texto: "Blister estándar" }
  }
];