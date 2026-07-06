const prisma = require("../prisma/client");
// controlador que sirve para las acciones de las mesas

// metodo para obtener todas las mesas
//funcion asincrona: funcion que se ejecuta en segundo plano
const obtenerMesas = async (req, res) => {
  const { disponible } = req.query;
  const filtros = {};

  if (disponible !== undefined) {
    filtros.disponible = disponible === "true";
  }

  const lista_mesas = await prisma.mesa.findMany({ where: filtros });
  res.status(200).json(lista_mesas);
};

//funcion para obtener una mesa por su ID
const obtenerMesaById = async (req, res) => {
  const idMesa = Number(req.params.id);
  const mesa = await prisma.mesa.findUnique({
    where: { id: idMesa },
  });

  // validamos si la mesa no existe
  if (!mesa) {
    return res.status(404).json({ error: "Mesa no encontrada" });
  }

  res.status(200).json(mesa);
};

// funcion para crear una nueva mesa
const crearMesa = async (req, res) => {
  const { numero, capacidad, disponible } = req.body;

  if (!numero || !capacidad) {
    return res
      .status(400)
      .json({ error: "Número y capacidad de la mesa son requeridos" });
  }

  const existeNumero = await prisma.mesa.findUnique({
    where: { numero: Number(numero) },
  });
  if (existeNumero) {
    return res.status(400).json({ error: "Ya existe una mesa con ese número" });
  }

  const nuevaMesa = await prisma.mesa.create({
    data: {
      numero: Number(numero),
      capacidad: Number(capacidad),
      disponible: disponible === undefined ? true : Boolean(disponible),
    },
  });

  res.status(201).json({
    message: "Mesa registrada correctamente",
    mesa: nuevaMesa,
  });
};

// actualizar una mesa por ID
const actualizarMesa = async (req, res) => {
  const id = Number(req.params.id);

  const existe = await prisma.mesa.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ error: "Mesa no encontrada" });
  }

  // update mesas set numero = 12, capacidad = 10, disponible = true where id = 2
  const mesa = await prisma.mesa.update({
    where: { id },
    data: req.body, //numero, capacidad, disponible
  });

  res.status(200).json({
    message: "Mesa actualizada exitosamente",
    mesa,
  });
};

// metodo que desactiva una mesa
const desactivarMesa = async (req, res) => {
  const id = Number(req.params.id);

  const existe = await prisma.mesa.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ error: "Mesa no encontrada" });
  }

  await prisma.mesa.update({
    where: { id },
    data: { disponible: false },
  });

  res.status(200).json({ message: "Mesa no disponible" });
};

// exportando los metodos para ocuparlos en cualquier lugar
module.exports = {
  obtenerMesas,
  obtenerMesaById,
  crearMesa,
  actualizarMesa,
  desactivarMesa,
};
