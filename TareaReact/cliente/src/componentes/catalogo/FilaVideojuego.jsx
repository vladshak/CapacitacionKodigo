function FilaVideojuego({ videojuego, onVer, onEliminar }) {
  const tieneImagen = Boolean(videojuego.urlImagen?.trim());

  return (
    <tr>
      <td>
        {tieneImagen ? (
          <img
            className="miniatura-tabla"
            src={videojuego.urlImagen}
            alt={videojuego.titulo}
          />
        ) : (
          <span className="imagen-fallback">Sin imagen</span>
        )}
      </td>
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
