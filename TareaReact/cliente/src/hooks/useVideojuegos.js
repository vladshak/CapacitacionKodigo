import { useEffect, useState } from "react";
import { obtenerVideojuegos } from "../servicios/videojuegos.js";

export function useVideojuegos(paginaInicial = 1, limite = 5) {
  const [videojuegos, establecerVideojuegos] = useState([]);
  const [estado, establecerEstado] = useState("cargando");
  const [mensajeError, establecerMensajeError] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(paginaInicial);
  const [totalPaginas, establecerTotalPaginas] = useState(1);
  const [totalRegistros, establecerTotalRegistros] = useState(0);

  async function cargarVideojuegos(pagina = paginaActual) {
    establecerEstado("cargando");
    establecerMensajeError("");

    try {
      const datos = await obtenerVideojuegos(pagina, limite);
      establecerVideojuegos(datos.videojuegos || []);
      establecerPaginaActual(datos.paginaActual || pagina);
      establecerTotalPaginas(datos.totalPaginas || 1);
      establecerTotalRegistros(datos.totalRegistros || 0);
      establecerEstado("exito");
    } catch (error) {
      establecerMensajeError(error.message);
      establecerEstado("error");
    }
  }

  useEffect(() => {
    cargarVideojuegos(paginaInicial);
  }, [paginaInicial]);

  return {
    videojuegos,
    estado,
    mensajeError,
    paginaActual,
    totalPaginas,
    totalRegistros,
    irAPagina: (pagina) => cargarVideojuegos(pagina),
    recargar: () => cargarVideojuegos(paginaActual),
  };
}
