// manejando las rutas para los metodos de la seccion "Mesas"
const express = require("express");
// constante principal para manejar las rutas
const router = express.Router();
// llamando a los metodos a utilizar para las rutas
const {
  obtenerMesas,
  obtenerMesaById,
  crearMesa,
} = require("../controller/mesa.controller");

// creando las rutas (/api/mesas)
router.get("/", obtenerMesas); // /api/v1/mesas/
// ruta con parametro
router.get("/:id", obtenerMesaById); // /api/v1/mesas/:id
router.post("/", crearMesa); // /api/v1/mesas/

// exportando las rutas
module.exports = router;
