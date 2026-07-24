import { useState } from "react";
import { eliminarVideojuego } from "../servicios/videojuegos.js";

export function useEliminarVideojuego(onExito) {
  const [estado, establecerEstado] = useState("inactivo");
  const [mensajeError, establecerMensajeError] = useState("");

  async function eliminar(id) {
    establecerEstado("eliminando");
    establecerMensajeError("");

    try {
      await eliminarVideojuego(id);
      establecerEstado("exito");
      onExito?.();
    } catch (error) {
      establecerEstado("error");
      establecerMensajeError(error.message);
    }
  }

  return { eliminar, estado, mensajeError };
}
