function ModalConfirmacion({
  abierto,
  titulo,
  mensaje,
  onCancelar,
  onConfirmar,
  cargando,
}) {
  if (!abierto) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onCancelar}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-contenido modal-confirmacion"
        onClick={(evento) => evento.stopPropagation()}
      >
        <h2>{titulo}</h2>
        <p>{mensaje}</p>
        <div className="acciones-modal">
          <button
            className="boton-secundario"
            type="button"
            onClick={onCancelar}
            disabled={cargando}
          >
            Cancelar
          </button>
          <button
            className="boton"
            type="button"
            onClick={onConfirmar}
            disabled={cargando}
          >
            {cargando ? "Eliminando…" : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;
