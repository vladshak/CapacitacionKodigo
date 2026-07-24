import poolConexion from "../baseDatos/conexion.js";
import { validarVideojuego } from "../validaciones/videojuegos.validacion.js";

const videojuegosPorDefecto = [
  {
    id: 1,
    titulo: "The Legend of Zelda: Breath of the Wild",
    plataforma: "Switch",
    genero: "Aventura",
    anioLanzamiento: 2017,
    desarrollador: "Nintendo",
    urlImagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    descripcion: "Una aventura épica en un mundo abierto con exploración y puzzles inolvidables.",
    calificacion: 9.8,
    creadoEn: new Date().toISOString(),
  },
  {
    id: 2,
    titulo: "Hades",
    plataforma: "PC",
    genero: "Roguelike",
    anioLanzamiento: 2020,
    desarrollador: "Supergiant Games",
    urlImagen: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&q=80",
    descripcion: "Combina acción rápida, narrativa atractiva y una progresión muy satisfactoria.",
    calificacion: 9.5,
    creadoEn: new Date().toISOString(),
  },
];

let videojuegosEnMemoria = [...videojuegosPorDefecto];

export async function listarVideojuegos(peticion, respuesta) {
  try {
    const [filas] = await poolConexion.query(
      "SELECT id, titulo, plataforma, genero, anio_lanzamiento AS anioLanzamiento, desarrollador, url_imagen AS urlImagen, descripcion, calificacion, creado_en AS creadoEn FROM videojuegos ORDER BY creado_en DESC"
    );

    return respuesta.json(filas.map(normalizarVideojuego));
  } catch (error) {
    return respuesta.json(videojuegosEnMemoria);
  }
}

export async function registrarVideojuego(peticion, respuesta) {
  const { esValido, errores } = validarVideojuego(peticion.body);

  if (!esValido) {
    return respuesta.status(400).json({ errores });
  }

  const datos = peticion.body;
  const videojuegoParaGuardar = {
    titulo: datos.titulo.trim(),
    plataforma: datos.plataforma,
    genero: datos.genero,
    anioLanzamiento: Number(datos.anioLanzamiento),
    desarrollador: datos.desarrollador.trim(),
    urlImagen: datos.urlImagen,
    descripcion: datos.descripcion.trim(),
    calificacion: Number(datos.calificacion),
  };

  try {
    const [resultado] = await poolConexion.query(
      `INSERT INTO videojuegos
        (titulo, plataforma, genero, anio_lanzamiento, desarrollador, url_imagen, descripcion, calificacion)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        videojuegoParaGuardar.titulo,
        videojuegoParaGuardar.plataforma,
        videojuegoParaGuardar.genero,
        videojuegoParaGuardar.anioLanzamiento,
        videojuegoParaGuardar.desarrollador,
        videojuegoParaGuardar.urlImagen,
        videojuegoParaGuardar.descripcion,
        videojuegoParaGuardar.calificacion,
      ]
    );

    return respuesta.status(201).json({
      id: resultado.insertId,
      ...videojuegoParaGuardar,
      creadoEn: new Date().toISOString(),
    });
  } catch (error) {
    const nuevoVideojuego = {
      id: videojuegosEnMemoria.length + 1,
      ...videojuegoParaGuardar,
      creadoEn: new Date().toISOString(),
    };

    videojuegosEnMemoria = [nuevoVideojuego, ...videojuegosEnMemoria];
    return respuesta.status(201).json(nuevoVideojuego);
  }
}

function normalizarVideojuego(videojuego) {
  return {
    id: videojuego.id,
    titulo: videojuego.titulo,
    plataforma: videojuego.plataforma,
    genero: videojuego.genero,
    anioLanzamiento: videojuego.anioLanzamiento,
    desarrollador: videojuego.desarrollador,
    urlImagen: videojuego.urlImagen,
    descripcion: videojuego.descripcion,
    calificacion: Number(videojuego.calificacion),
    creadoEn: videojuego.creadoEn,
  };
}
