import { useState, useEffect } from 'react';

export const useCarrito = () => {
  // Leemos del localStorage
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('fgstore_carrito');
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.error("Error leyendo localStorage", error);
      return [];
    }
  });
  
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);

  // Guardamos cada cambio
  useEffect(() => {
    localStorage.setItem('fgstore_carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id ? {...item, cantidad: item.cantidad + 1} : item);
      }
      return [...prev, {...producto, cantidad: 1}];
    });
    setIsCarritoAbierto(true);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === id) {
        const nuevaCantidad = Math.max(1, item.cantidad + delta);
        return {...item, cantidad: nuevaCantidad};
      }
      return item;
    }));
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return {
    carrito,
    isCarritoAbierto,
    setIsCarritoAbierto,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    totalCarrito
  };
};