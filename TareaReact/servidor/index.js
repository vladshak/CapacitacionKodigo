import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rutasVideojuegos from "./rutas/videojuegos.rutas.js";

dotenv.config();

const aplicacion = express();
aplicacion.use(cors());
aplicacion.use(express.json());
aplicacion.use("/api/videojuegos", rutasVideojuegos);

const puerto = process.env.PORT || 4000;
aplicacion.listen(puerto, () => {
  console.log(`Servidor GameVault escuchando en el puerto ${puerto}`);
});
