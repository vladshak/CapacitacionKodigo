require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const mesasRoutes = require("./routes/mesa.routes");
const authRoutes = require("./routes/auth.routes");
const reservacionRoutes = require("./routes/reservacion.routes");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/mesas", mesasRoutes);
app.use("/api/reservaciones", reservacionRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutando en http://localhost:${port}`);
  console.log(`Documentación en http://localhost:${port}/api-docs`);
});
