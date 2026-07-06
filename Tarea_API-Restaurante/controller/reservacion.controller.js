const prisma = require("../prisma/client");

const crearReservacion = async (req, res) => {
  const { mesaId, fecha, hora, personas } = req.body;
  const usuarioId = req.usuario.id;

  if (!mesaId || !fecha || !hora || !personas) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const mesa = await prisma.mesa.findUnique({ where: { id: Number(mesaId) } });
  if (!mesa || !mesa.disponible) {
    return res
      .status(400)
      .json({ error: "Mesa no disponible o no encontrada" });
  }

  const existeReserva = await prisma.reservacion.findFirst({
    where: {
      mesaId: Number(mesaId),
      fecha: new Date(fecha),
      hora: new Date(hora),
      estado: { not: "cancelada" },
    },
  });

  if (existeReserva) {
    return res
      .status(400)
      .json({ error: "La mesa ya está reservada en esta fecha y hora" });
  }

  const nuevaReservacion = await prisma.reservacion.create({
    data: {
      mesaId: Number(mesaId),
      usuarioId,
      fecha: new Date(fecha),
      hora: new Date(hora),
      personas: Number(personas),
    },
  });

  res.status(201).json({
    message: "Reservación creada con éxito",
    reservacion: nuevaReservacion,
  });
};

const obtenerMisReservaciones = async (req, res) => {
  const usuarioId = req.usuario.id;

  const reservaciones = await prisma.reservacion.findMany({
    where: { usuarioId },
    include: {
      mesa: true,
    },
    orderBy: {
      fecha: "asc",
    },
  });

  res.status(200).json(reservaciones);
};

const obtenerReservaciones = async (req, res) => {
  const { estado, fecha, mesaId } = req.query;

  const filtros = {};
  if (estado) filtros.estado = estado;
  if (mesaId) filtros.mesaId = Number(mesaId);
  if (fecha) filtros.fecha = new Date(fecha);

  const reservaciones = await prisma.reservacion.findMany({
    where: filtros,
    include: {
      mesa: true,
      usuario: {
        select: {
          id: true,
          nombre: true,
          correo: true,
        },
      },
    },
    orderBy: {
      fecha: "asc",
    },
  });

  res.status(200).json(reservaciones);
};

const cambiarEstadoReservacion = async (req, res) => {
  const id = Number(req.params.id);
  const { estado } = req.body;

  if (!["pendiente", "confirmada", "cancelada"].includes(estado)) {
    return res.status(400).json({ error: "Estado inválido" });
  }

  const reservacion = await prisma.reservacion.findUnique({ where: { id } });
  if (!reservacion) {
    return res.status(404).json({ error: "Reservación no encontrada" });
  }

  const reservacionActualizada = await prisma.reservacion.update({
    where: { id },
    data: { estado },
  });

  res.status(200).json({
    message: "Estado de reservación actualizado",
    reservacion: reservacionActualizada,
  });
};

const cancelarReservacion = async (req, res) => {
  const id = Number(req.params.id);
  const usuarioId = req.usuario.id;

  const reservacion = await prisma.reservacion.findUnique({ where: { id } });
  if (!reservacion) {
    return res.status(404).json({ error: "Reservación no encontrada" });
  }

  if (reservacion.usuarioId !== usuarioId) {
    return res
      .status(403)
      .json({ error: "No puedes cancelar una reservación que no es tuya" });
  }

  const reservacionCancelada = await prisma.reservacion.update({
    where: { id },
    data: { estado: "cancelada" },
  });

  res.status(200).json({
    message: "Reservación cancelada",
    reservacion: reservacionCancelada,
  });
};

module.exports = {
  crearReservacion,
  obtenerMisReservaciones,
  obtenerReservaciones,
  cambiarEstadoReservacion,
  cancelarReservacion,
};
