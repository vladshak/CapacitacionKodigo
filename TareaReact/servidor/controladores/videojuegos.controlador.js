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
    urlImagen:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Una aventura épica en un mundo abierto con exploración y puzzles inolvidables.",
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
    urlImagen:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Combina acción rápida, narrativa atractiva y una progresión muy satisfactoria.",
    calificacion: 9.5,
    creadoEn: new Date().toISOString(),
  },
];

let videojuegosEnMemoria = [...videojuegosPorDefecto];

export async function listarVideojuegos(peticion, respuesta) {
  try {
    const pagina = Number(peticion.query.pagina || 1);
    const limite = Number(peticion.query.limite || 5);
    const desplazamiento = (pagina - 1) * limite;

    const [filas] = await poolConexion.query(
      `SELECT id, titulo, plataforma, genero, anio_lanzamiento AS anioLanzamiento, desarrollador, url_imagen AS urlImagen, descripcion, calificacion, creado_en AS creadoEn
       FROM videojuegos
       ORDER BY creado_en DESC
       LIMIT ? OFFSET ?`,
      [limite, desplazamiento],
    );

    const [resultadoConteo] = await poolConexion.query(
      "SELECT COUNT(*) AS total FROM videojuegos",
    );
    const total = resultadoConteo[0].total;
    const totalPaginas = Math.max(1, Math.ceil(total / limite));

    return respuesta.json({
      videojuegos: filas.map(normalizarVideojuego),
      paginaActual: pagina,
      totalPaginas,
      totalRegistros: total,
    });
  } catch (error) {
    const totalPaginas = Math.max(
      1,
      Math.ceil(
        videojuegosEnMemoria.length /
          Math.max(1, Number(peticion.query.limite || 5)),
      ),
    );
    return respuesta.json({
      videojuegos: videojuegosEnMemoria.slice(
        0,
        Number(peticion.query.limite || 5),
      ),
      paginaActual: 1,
      totalPaginas,
      totalRegistros: videojuegosEnMemoria.length,
    });
  }
}

export async function obtenerVideojuego(peticion, respuesta) {
  const { id } = peticion.params;

  try {
    const [filas] = await poolConexion.query(
      `SELECT id, titulo, plataforma, genero, anio_lanzamiento AS anioLanzamiento, desarrollador, url_imagen AS urlImagen, descripcion, calificacion, creado_en AS creadoEn
       FROM videojuegos WHERE id = ?`,
      [id],
    );

    if (filas.length === 0) {
      return respuesta
        .status(404)
        .json({ mensaje: "Videojuego no encontrado." });
    }

    return respuesta.json(normalizarVideojuego(filas[0]));
  } catch (error) {
    return respuesta.status(404).json({ mensaje: "Videojuego no encontrado." });
  }
}

export async function registrarVideojuego(peticion, respuesta) {
  const { esValido, errores } = validarVideojuego(peticion.body);

  if (!esValido) {
    return respuesta.status(400).json({ errores, mensaje: "Datos inválidos." });
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
      ],
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

export async function actualizarVideojuego(peticion, respuesta) {
  const { id } = peticion.params;
  const { esValido, errores } = validarVideojuego(peticion.body);

  if (!esValido) {
    return respuesta.status(400).json({ errores, mensaje: "Datos inválidos." });
  }

  const datos = peticion.body;
  const videojuegoParaActualizar = {
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
    await poolConexion.query(
      `UPDATE videojuegos SET titulo = ?, plataforma = ?, genero = ?, anio_lanzamiento = ?, desarrollador = ?, url_imagen = ?, descripcion = ?, calificacion = ? WHERE id = ?`,
      [
        videojuegoParaActualizar.titulo,
        videojuegoParaActualizar.plataforma,
        videojuegoParaActualizar.genero,
        videojuegoParaActualizar.anioLanzamiento,
        videojuegoParaActualizar.desarrollador,
        videojuegoParaActualizar.urlImagen,
        videojuegoParaActualizar.descripcion,
        videojuegoParaActualizar.calificacion,
        id,
      ],
    );

    return respuesta.json({
      id: Number(id),
      ...videojuegoParaActualizar,
      creadoEn: new Date().toISOString(),
    });
  } catch (error) {
    return respuesta
      .status(500)
      .json({ mensaje: "No se pudo actualizar el videojuego." });
  }
}

export async function eliminarVideojuego(peticion, respuesta) {
  const { id } = peticion.params;

  try {
    await poolConexion.query("DELETE FROM videojuegos WHERE id = ?", [id]);
    return respuesta.json({ mensaje: "Videojuego eliminado." });
  } catch (error) {
    return respuesta
      .status(500)
      .json({ mensaje: "No se pudo eliminar el videojuego." });
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
