// src/helpers/slug.js
export const crearSlug = (nombre) => {
  if (!nombre) return '';
  return nombre
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar tildes (á -> a)
    .replace(/\s+/g, '-')     // Cambiar espacios por guiones
    .replace(/[^\w\-]+/g, '') // Quitar caracteres raros (ñ, %, etc)
    .replace(/\-\-+/g, '-');  // Evitar guiones dobles
};