import { Router } from "express";
import {
  listarVideojuegos,
  obtenerVideojuego,
  registrarVideojuego,
  actualizarVideojuego,
  eliminarVideojuego,
} from "../controladores/videojuegos.controlador.js";

const rutasVideojuegos = Router();
rutasVideojuegos.get("/", listarVideojuegos);
rutasVideojuegos.get("/:id", obtenerVideojuego);
rutasVideojuegos.post("/", registrarVideojuego);
rutasVideojuegos.put("/:id", actualizarVideojuego);
rutasVideojuegos.delete("/:id", eliminarVideojuego);

export default rutasVideojuegos;
