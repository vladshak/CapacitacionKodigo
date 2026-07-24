import { useEffect } from "react";

function Modal({ abierto, titulo, onCerrar, children }) {
  useEffect(() => {
    if (!abierto) return;

    const manejarTecla = (evento) => {
      if (evento.key === "Escape") {
        onCerrar?.();
      }
    };

    document.addEventListener("keydown", manejarTecla);
    return () => document.removeEventListener("keydown", manejarTecla);
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-contenido"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{titulo}</h2>
          <button className="boton-secundario" type="button" onClick={onCerrar}>
            Cerrar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
