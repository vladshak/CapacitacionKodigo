function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
  return (
    <div className="paginacion">
      <button
        className="boton-secundario"
        type="button"
        onClick={() => onCambiarPagina(Math.max(1, paginaActual - 1))}
        disabled={paginaActual === 1}
      >
        Anterior
      </button>
      <span>
        Página {paginaActual} de {totalPaginas}
      </span>
      <button
        className="boton-secundario"
        type="button"
        onClick={() =>
          onCambiarPagina(Math.min(totalPaginas, paginaActual + 1))
        }
        disabled={paginaActual >= totalPaginas}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Paginacion;
