export function validarVideojuego(datos) {
  const errores = {};

  if (!datos.titulo || datos.titulo.trim().length < 3 || datos.titulo.trim().length > 80) {
    errores.titulo = "El título debe tener entre 3 y 80 caracteres.";
  }

  if (!datos.plataforma) {
    errores.plataforma = "Selecciona una plataforma válida.";
  }

  if (!datos.genero) {
    errores.genero = "Selecciona un género válido.";
  }

  const anioActual = new Date().getFullYear();
  const anioLanzamiento = Number(datos.anioLanzamiento);
  if (!Number.isInteger(anioLanzamiento) || anioLanzamiento < 1970 || anioLanzamiento > anioActual) {
    errores.anioLanzamiento = `El año debe estar entre 1970 y ${anioActual}.`;
  }

  if (!datos.desarrollador || datos.desarrollador.trim().length < 2 || datos.desarrollador.trim().length > 60) {
    errores.desarrollador = "El desarrollador debe tener entre 2 y 60 caracteres.";
  }

  if (!esUrlValida(datos.urlImagen)) {
    errores.urlImagen = "Ingresa una URL de imagen válida.";
  }

  if (!datos.descripcion || datos.descripcion.trim().length < 20 || datos.descripcion.trim().length > 500) {
    errores.descripcion = "La descripción debe tener entre 20 y 500 caracteres.";
  }

  const calificacion = Number(datos.calificacion);
  if (Number.isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
    errores.calificacion = "La calificación debe estar entre 0.0 y 10.0.";
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores,
  };
}

function esUrlValida(texto) {
  try {
    new URL(texto);
    return true;
  } catch {
    return false;
  }
}
