import { useState } from 'react';
import { useCrearVideojuego } from '../../hooks/useCrearVideojuego.js';
import { useValidacionFormulario } from '../../hooks/useValidacionFormulario.js';
import CampoFormulario from './CampoFormulario.jsx';

const estadoInicial = {
  titulo: '',
  plataforma: '',
  genero: '',
  anioLanzamiento: '',
  desarrollador: '',
  urlImagen: '',
  descripcion: '',
  calificacion: '',
};

function FormularioVideojuego({ onVideojuegoCreado }) {
  const [valores, establecerValores] = useState(estadoInicial);
  const { errores, esValido } = useValidacionFormulario(valores);
  const { enviar, estado, mensajeError } = useCrearVideojuego(() => {
    establecerValores(estadoInicial);
    onVideojuegoCreado?.();
  });

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    establecerValores((anterior) => ({ ...anterior, [name]: value }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    if (!esValido) return;

    await enviar({
      ...valores,
      anioLanzamiento: Number(valores.anioLanzamiento),
      calificacion: Number(valores.calificacion),
    });
  }

  return (
    <form className="panel" onSubmit={manejarEnvio}>
      <h2>Registrar videojuego</h2>
      <p>Completa los campos para agregar un nuevo título al catálogo.</p>
      <CampoFormulario etiqueta="Título" nombre="titulo" valor={valores.titulo} onChange={manejarCambio} error={errores.titulo} placeholder="Ej. Elden Ring" />
      <CampoFormulario etiqueta="Plataforma" nombre="plataforma" tipo="select" valor={valores.plataforma} onChange={manejarCambio} opciones={['PC', 'PlayStation', 'Xbox', 'Switch', 'Móvil']} error={errores.plataforma} />
      <CampoFormulario etiqueta="Género" nombre="genero" tipo="select" valor={valores.genero} onChange={manejarCambio} opciones={['Acción', 'RPG', 'Deportes', 'Estrategia', 'Aventura', 'Roguelike']} error={errores.genero} />
      <CampoFormulario etiqueta="Año de lanzamiento" nombre="anioLanzamiento" tipo="number" valor={valores.anioLanzamiento} onChange={manejarCambio} error={errores.anioLanzamiento} placeholder="2023" />
      <CampoFormulario etiqueta="Desarrollador" nombre="desarrollador" valor={valores.desarrollador} onChange={manejarCambio} error={errores.desarrollador} placeholder="Nombre del estudio" />
      <CampoFormulario etiqueta="URL de imagen" nombre="urlImagen" valor={valores.urlImagen} onChange={manejarCambio} error={errores.urlImagen} placeholder="https://..." />
      <CampoFormulario etiqueta="Descripción" nombre="descripcion" tipo="textarea" valor={valores.descripcion} onChange={manejarCambio} error={errores.descripcion} placeholder="Describe el juego" />
      <CampoFormulario etiqueta="Calificación" nombre="calificacion" tipo="number" valor={valores.calificacion} onChange={manejarCambio} error={errores.calificacion} placeholder="9.5" />

      {mensajeError ? <p className="mensaje-error">{mensajeError}</p> : null}
      {estado === 'exito' ? <p className="mensaje-exito">Videojuego guardado correctamente.</p> : null}
      <button className="boton" type="submit" disabled={!esValido || estado === 'enviando'}>
        {estado === 'enviando' ? 'Guardando…' : 'Guardar'}
      </button>
    </form>
  );
}

export default FormularioVideojuego;
