import EstadoCargandoTabla from "./EstadoCargandoTabla.jsx";
import EstadoErrorTabla from "./EstadoErrorTabla.jsx";
import EstadoVacioTabla from "./EstadoVacioTabla.jsx";
import FilaVideojuego from "./FilaVideojuego.jsx";
import Paginacion from "./Paginacion.jsx";
import { useVideojuegos } from "../../hooks/useVideojuegos.js";

function ListaVideojuegos({ onVer, onEliminar }) {
  const {
    videojuegos,
    estado,
    mensajeError,
    paginaActual,
    totalPaginas,
    totalRegistros,
    irAPagina,
    recargar,
  } = useVideojuegos();

  if (estado === "cargando") {
    return <EstadoCargandoTabla />;
  }

  if (estado === "error") {
    return <EstadoErrorTabla mensaje={mensajeError} onReintentar={recargar} />;
  }

  if (videojuegos.length === 0) {
    return <EstadoVacioTabla />;
  }

  return (
    <div>
      <table className="tabla-videojuegos">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Plataforma</th>
            <th>Género</th>
            <th>Año</th>
            <th>Desarrollador</th>
            <th>Calificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {videojuegos.map((videojuego) => (
            <FilaVideojuego
              key={videojuego.id}
              videojuego={videojuego}
              onVer={onVer}
              onEliminar={onEliminar}
            />
          ))}
        </tbody>
      </table>
      <div className="tabla-footer">
        <span>{totalRegistros} registros</span>
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={irAPagina}
        />
      </div>
    </div>
  );
}

export default ListaVideojuegos;
