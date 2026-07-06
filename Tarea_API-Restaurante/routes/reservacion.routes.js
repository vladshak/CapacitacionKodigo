const express = require("express");
const router = express.Router();
const {
  verificarToken,
  verificarAdmin,
} = require("../middleware/auth.middleware");
const {
  crearReservacion,
  obtenerMisReservaciones,
  obtenerReservaciones,
  cambiarEstadoReservacion,
  cancelarReservacion,
} = require("../controller/reservacion.controller");

router.post("/", verificarToken, crearReservacion);
router.get("/mis", verificarToken, obtenerMisReservaciones);
router.get("/", verificarToken, verificarAdmin, obtenerReservaciones);
router.put(
  "/:id/estado",
  verificarToken,
  verificarAdmin,
  cambiarEstadoReservacion,
);
router.delete("/:id", verificarToken, cancelarReservacion);

module.exports = router;
