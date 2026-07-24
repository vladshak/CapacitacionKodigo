export const reglasFormulario = {
  titulo: {
    mensaje: 'El título debe tener entre 3 y 80 caracteres.',
  },
  plataforma: {
    opciones: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Móvil'],
    mensaje: 'Selecciona una plataforma válida.',
  },
  genero: {
    opciones: ['Acción', 'RPG', 'Deportes', 'Estrategia', 'Aventura', 'Roguelike'],
    mensaje: 'Selecciona un género válido.',
  },
  anioLanzamiento: {
    mensaje: 'El año debe estar entre 1970 y {anioActual}.',
  },
  desarrollador: {
    mensaje: 'El desarrollador debe tener entre 2 y 60 caracteres.',
  },
  urlImagen: {
    mensaje: 'Ingresa una URL de imagen válida.',
  },
  descripcion: {
    mensaje: 'La descripción debe tener entre 20 y 500 caracteres.',
  },
  calificacion: {
    mensaje: 'La calificación debe estar entre 0.0 y 10.0.',
  },
};
