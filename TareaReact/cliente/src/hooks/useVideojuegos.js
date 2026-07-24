import { useEffect, useState } from 'react';
import { obtenerVideojuegos } from '../servicios/videojuegos.js';

export function useVideojuegos() {
  const [videojuegos, establecerVideojuegos] = useState([]);
  const [estado, establecerEstado] = useState('cargando');
  const [mensajeError, establecerMensajeError] = useState('');

  async function cargarVideojuegos() {
    establecerEstado('cargando');
    establecerMensajeError('');

    try {
      const datos = await obtenerVideojuegos();
      establecerVideojuegos(datos);
      establecerEstado('exito');
    } catch (error) {
      establecerMensajeError(error.message);
      establecerEstado('error');
    }
  }

  useEffect(() => {
    cargarVideojuegos();
  }, []);

  return { videojuegos, estado, mensajeError, recargar: cargarVideojuegos };
}
