import { useEffect, useState } from "react";
import { useGuardarVideojuego } from "../../hooks/useGuardarVideojuego.js";
import { useValidacionFormulario } from "../../hooks/useValidacionFormulario.js";
import CampoFormulario from "./CampoFormulario.jsx";

const estadoInicial = {
  titulo: "",
  plataforma: "",
  genero: "",
  anioLanzamiento: "",
  desarrollador: "",
  urlImagen: "",
  descripcion: "",
  calificacion: "",
};

function FormularioVideojuego({
  modo = "crear",
  videojuegoInicial,
  onExito,
  onCancelar,
  onEditar,
}) {
  const [valores, establecerValores] = useState(estadoInicial);
  const { errores, esValido } = useValidacionFormulario(valores);
  const { guardar, estado, mensajeError } = useGuardarVideojuego(() => {
    establecerValores(estadoInicial);
    onExito?.();
  });

  useEffect(() => {
    if (videojuegoInicial) {
      establecerValores({
        titulo: videojuegoInicial.titulo || "",
        plataforma: videojuegoInicial.plataforma || "",
        genero: videojuegoInicial.genero || "",
        anioLanzamiento: videojuegoInicial.anioLanzamiento || "",
        desarrollador: videojuegoInicial.desarrollador || "",
        urlImagen: videojuegoInicial.urlImagen || "",
        descripcion: videojuegoInicial.descripcion || "",
        calificacion: videojuegoInicial.calificacion || "",
      });
    }
  }, [videojuegoInicial]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    establecerValores((anterior) => ({ ...anterior, [name]: value }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    if (!esValido) return;

    await guardar(
      {
        ...valores,
        anioLanzamiento: Number(valores.anioLanzamiento),
        calificacion: Number(valores.calificacion),
      },
      videojuegoInicial?.id,
    );
  }

  const esModoDetalle = modo === "detalle";
  const esModoEdicion = modo === "editar";
  const esSoloLectura = esModoDetalle;

  return (
    <form className="panel" onSubmit={manejarEnvio}>
      {modo === "crear" ? (
        <>
          <h2>Registrar videojuego</h2>
          <p>Completa los campos para agregar un nuevo título al catálogo.</p>
        </>
      ) : null}
      {modo === "detalle" ? (
        <div className="detalle-resumen">
          <h3>{videojuegoInicial?.titulo}</h3>
          <p>{videojuegoInicial?.descripcion}</p>
        </div>
      ) : null}

      <CampoFormulario
        etiqueta="Título"
        nombre="titulo"
        valor={valores.titulo}
        onChange={manejarCambio}
        error={errores.titulo}
        placeholder="Ej. Elden Ring"
        disabled={esSoloLectura}
      />
      <CampoFormulario
        etiqueta="Plataforma"
        nombre="plataforma"
        tipo="select"
        valor={valores.plataforma}
        onChange={manejarCambio}
        opciones={["PC", "PlayStation", "Xbox", "Switch", "Móvil"]}
        error={errores.plataforma}
        disabled={esSoloLectura}
      />
      <CampoFormulario
        etiqueta="Género"
        nombre="genero"
        tipo="select"
        valor={valores.genero}
        onChange={manejarCambio}
        opciones={[
          "Acción",
          "RPG",
          "Deportes",
          "Estrategia",
          "Aventura",
          "Roguelike",
        ]}
        error={errores.genero}
        disabled={esSoloLectura}
      />
      <CampoFormulario
        etiqueta="Año de lanzamiento"
        nombre="anioLanzamiento"
        tipo="number"
        valor={valores.anioLanzamiento}
        onChange={manejarCambio}
        error={errores.anioLanzamiento}
        placeholder="2023"
        disabled={esSoloLectura}
      />
      <CampoFormulario
        etiqueta="Desarrollador"
        nombre="desarrollador"
        valor={valores.desarrollador}
        onChange={manejarCambio}
        error={errores.desarrollador}
        placeholder="Nombre del estudio"
        disabled={esSoloLectura}
      />
      <CampoFormulario
        etiqueta="URL de imagen"
        nombre="urlImagen"
        valor={valores.urlImagen}
        onChange={manejarCambio}
        error={errores.urlImagen}
        placeholder="https://..."
        disabled={esSoloLectura}
      />
      <CampoFormulario
        etiqueta="Descripción"
        nombre="descripcion"
        tipo="textarea"
        valor={valores.descripcion}
        onChange={manejarCambio}
        error={errores.descripcion}
        placeholder="Describe el juego"
        disabled={esSoloLectura}
      />
      <CampoFormulario
        etiqueta="Calificación"
        nombre="calificacion"
        tipo="number"
        valor={valores.calificacion}
        onChange={manejarCambio}
        error={errores.calificacion}
        placeholder="9.5"
        disabled={esSoloLectura}
      />

      {mensajeError ? <p className="mensaje-error">{mensajeError}</p> : null}
      {estado === "exito" ? (
        <p className="mensaje-exito">Videojuego guardado correctamente.</p>
      ) : null}

      <div className="acciones-modal">
        {modo === "detalle" ? (
          <button className="boton" type="button" onClick={onEditar}>
            Editar
          </button>
        ) : (
          <button
            className="boton"
            type="submit"
            disabled={!esValido || estado === "guardando"}
          >
            {estado === "guardando"
              ? "Guardando…"
              : modo === "editar"
                ? "Guardar cambios"
                : "Guardar"}
          </button>
        )}
        {modo === "crear" ? (
          <button
            className="boton-secundario"
            type="button"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        ) : null}
        {modo === "editar" ? (
          <button
            className="boton-secundario"
            type="button"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default FormularioVideojuego;
