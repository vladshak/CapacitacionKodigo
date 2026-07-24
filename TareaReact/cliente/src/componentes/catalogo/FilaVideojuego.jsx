function FilaVideojuego({ videojuego, onVer, onEliminar }) {
  return (
    <tr>
      <td>{videojuego.titulo}</td>
      <td>{videojuego.plataforma}</td>
      <td>{videojuego.genero}</td>
      <td>{videojuego.anioLanzamiento}</td>
      <td>{videojuego.desarrollador}</td>
      <td>{Number(videojuego.calificacion).toFixed(1)}</td>
      <td>
        <div className="acciones-tabla">
          <button
            className="boton-secundario"
            type="button"
            onClick={() => onVer(videojuego)}
          >
            Ver
          </button>
          <button
            className="boton-secundario"
            type="button"
            onClick={() => onEliminar(videojuego)}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

export default FilaVideojuego;
