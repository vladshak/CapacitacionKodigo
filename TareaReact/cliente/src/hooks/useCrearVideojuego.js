import { useState } from 'react';
import { crearVideojuego } from '../servicios/videojuegos.js';

export function useCrearVideojuego(onExito) {
  const [estado, establecerEstado] = useState('inactivo');
  const [mensajeError, establecerMensajeError] = useState('');

  async function enviar(datos) {
    establecerEstado('enviando');
    establecerMensajeError('');

    try {
      await crearVideojuego(datos);
      establecerEstado('exito');
      onExito?.();
    } catch (error) {
      establecerEstado('error');
      establecerMensajeError(error.message);
    }
  }

  return { enviar, estado, mensajeError };
}
