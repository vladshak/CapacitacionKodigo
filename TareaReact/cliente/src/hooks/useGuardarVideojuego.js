import { useState } from "react";
import {
  crearVideojuego,
  actualizarVideojuego,
} from "../servicios/videojuegos.js";

export function useGuardarVideojuego(onExito) {
  const [estado, establecerEstado] = useState("inactivo");
  const [mensajeError, establecerMensajeError] = useState("");

  async function guardar(datos, id) {
    establecerEstado("guardando");
    establecerMensajeError("");

    try {
      if (id) {
        await actualizarVideojuego(id, datos);
      } else {
        await crearVideojuego(datos);
      }

      establecerEstado("exito");
      onExito?.();
    } catch (error) {
      establecerEstado("error");
      establecerMensajeError(error.message);
    }
  }

  return { guardar, estado, mensajeError };
}
