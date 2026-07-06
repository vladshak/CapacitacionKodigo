// manejando las rutas para los metodos de la seccion "Mesas"
const express = require("express");
// constante principal para manejar las rutas
const router = express.Router();
// llamando a los metodos a utilizar para las rutas
const {
  obtenerMesas,
  obtenerMesaById,
  crearMesa,
  actualizarMesa,
  desactivarMesa,
} = require("../controller/mesa.controller");
const {
  verificarToken,
  verificarAdmin,
} = require("../middleware/auth.middleware");

// creando las rutas (/api/mesas)
router.get("/", obtenerMesas); // /api/mesas
router.get("/:id", obtenerMesaById); // /api/mesas/:id

// rutas protegidas
router.post("/", verificarToken, verificarAdmin, crearMesa); // /api/mesas
router.put("/:id", verificarToken, verificarAdmin, actualizarMesa); // /api/mesas/:id
router.delete("/:id", verificarToken, verificarAdmin, desactivarMesa); // /api/mesas/:id

// exportando las rutas
module.exports = router;
