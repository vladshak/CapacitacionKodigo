import { Router } from "express";
import { listarVideojuegos, registrarVideojuego } from "../controladores/videojuegos.controlador.js";

const rutasVideojuegos = Router();
rutasVideojuegos.get("/", listarVideojuegos);
rutasVideojuegos.post("/", registrarVideojuego);

export default rutasVideojuegos;
