import { useMemo, useState } from "react";
import ListaVideojuegos from "../componentes/catalogo/ListaVideojuegos.jsx";
import Modal from "../componentes/comunes/Modal.jsx";
import ModalConfirmacion from "../componentes/comunes/ModalConfirmacion.jsx";
import FormularioVideojuego from "../componentes/formulario/FormularioVideojuego.jsx";
import { useEliminarVideojuego } from "../hooks/useEliminarVideojuego.js";
import { useVideojuego } from "../hooks/useVideojuego.js";

function PaginaCatalogo({ onVolver }) {
  const [modalRegistroAbierto, establecerModalRegistroAbierto] =
    useState(false);
  const [modalDetalleAbierto, establecerModalDetalleAbierto] = useState(false);
  const [modalConfirmacionAbierto, establecerModalConfirmacionAbierto] =
    useState(false);
  const [videojuegoSeleccionado, establecerVideojuegoSeleccionado] =
    useState(null);
  const [modoEdicion, establecerModoEdicion] = useState(false);
  const [recargarClave, establecerRecargarClave] = useState(0);

  const { videojuego, estado: estadoDetalle } = useVideojuego(
    videojuegoSeleccionado?.id || null,
  );
  const {
    eliminar,
    estado: estadoEliminacion,
    mensajeError: mensajeErrorEliminacion,
  } = useEliminarVideojuego(() => {
    establecerModalConfirmacionAbierto(false);
    establecerVideojuegoSeleccionado(null);
    establecerRecargarClave((valor) => valor + 1);
  });

  const detalleActual = useMemo(
    () => videojuego ?? videojuegoSeleccionado,
    [videojuego, videojuegoSeleccionado],
  );

  function abrirDetalle(videojuego) {
    establecerVideojuegoSeleccionado(videojuego);
    establecerModoEdicion(false);
    establecerModalDetalleAbierto(true);
  }

  function cerrarDetalle() {
    establecerModalDetalleAbierto(false);
    establecerModoEdicion(false);
    establecerVideojuegoSeleccionado(null);
  }

  function abrirConfirmacion(videojuego) {
    establecerVideojuegoSeleccionado(videojuego);
    establecerModalConfirmacionAbierto(true);
  }

  function confirmarEliminacion() {
    if (!videojuegoSeleccionado?.id) return;
    eliminar(videojuegoSeleccionado.id);
  }

  function onGuardarExitoso() {
    establecerModalRegistroAbierto(false);
    establecerModalDetalleAbierto(false);
    establecerModoEdicion(false);
    establecerVideojuegoSeleccionado(null);
    establecerRecargarClave((valor) => valor + 1);
  }

  return (
    <main className="contenedor catalogo">
      <div className="fila" style={{ marginBottom: "1.5rem" }}>
        <h1>Catálogo de videojuegos</h1>
        <div className="acciones-catalogo">
          <button
            className="boton"
            type="button"
            onClick={() => establecerModalRegistroAbierto(true)}
          >
            + Agregar videojuego
          </button>
          <button className="boton-secundario" onClick={onVolver} type="button">
            Volver
          </button>
        </div>
      </div>

      <section className="panel">
        <ListaVideojuegos
          key={recargarClave}
          onVer={abrirDetalle}
          onEliminar={abrirConfirmacion}
        />
      </section>

      <Modal
        abierto={modalRegistroAbierto}
        titulo="Registrar videojuego"
        onCerrar={() => establecerModalRegistroAbierto(false)}
      >
        <FormularioVideojuego
          modo="crear"
          onExito={onGuardarExitoso}
          onCancelar={() => establecerModalRegistroAbierto(false)}
        />
      </Modal>

      <Modal
        abierto={modalDetalleAbierto}
        titulo={modoEdicion ? "Editar videojuego" : "Detalle del videojuego"}
        onCerrar={cerrarDetalle}
      >
        {estadoDetalle === "cargando" ? <p>Cargando detalle…</p> : null}
        {detalleActual ? (
          <FormularioVideojuego
            modo={modoEdicion ? "editar" : "detalle"}
            videojuegoInicial={detalleActual}
            onExito={onGuardarExitoso}
            onCancelar={cerrarDetalle}
            onEditar={() => establecerModoEdicion(true)}
          />
        ) : null}
      </Modal>

      <ModalConfirmacion
        abierto={modalConfirmacionAbierto}
        titulo="Confirmar eliminación"
        mensaje={
          videojuegoSeleccionado
            ? `¿Seguro que deseas eliminar “${videojuegoSeleccionado.titulo}”?`
            : "¿Seguro que deseas eliminar este videojuego?"
        }
        onCancelar={() => establecerModalConfirmacionAbierto(false)}
        onConfirmar={confirmarEliminacion}
        cargando={estadoEliminacion === "eliminando"}
      />
      {mensajeErrorEliminacion ? (
        <p className="mensaje-error">{mensajeErrorEliminacion}</p>
      ) : null}
    </main>
  );
}

export default PaginaCatalogo;
