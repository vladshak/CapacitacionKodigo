import { useEffect, useState } from "react";
import { obtenerVideojuegoPorId } from "../servicios/videojuegos.js";

export function useVideojuego(id) {
  const [videojuego, establecerVideojuego] = useState(null);
  const [estado, establecerEstado] = useState("inactivo");
  const [mensajeError, establecerMensajeError] = useState("");

  useEffect(() => {
    if (!id) {
      establecerVideojuego(null);
      establecerEstado("inactivo");
      establecerMensajeError("");
      return;
    }

    async function cargar() {
      establecerEstado("cargando");
      establecerMensajeError("");

      try {
        const datos = await obtenerVideojuegoPorId(id);
        establecerVideojuego(datos);
        establecerEstado("exito");
      } catch (error) {
        establecerMensajeError(error.message);
        establecerEstado("error");
      }
    }

    cargar();
  }, [id]);

  return { videojuego, estado, mensajeError };
}
