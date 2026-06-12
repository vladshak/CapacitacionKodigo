const express = require("express");
const app = express();
//const PUERTO = 3000;

app.use(express.json());

// ─────────────────────────────────────────────
// Datos quemados — lista inicial de estudiantes
// ─────────────────────────────────────────────
let estudiantes = [
  {
    id: 1,
    nombre: "Ana Martínez",
    carrera: "Ingeniería en Sistemas",
    edad: 21,
    promedio: 8.7,
    activo: true,
  },
  {
    id: 2,
    nombre: "Carlos López",
    carrera: "Administración de Empresas",
    edad: 23,
    promedio: 7.9,
    activo: true,
  },
  {
    id: 3,
    nombre: "Sofía Ramírez",
    carrera: "Diseño Gráfico",
    edad: 20,
    promedio: 9.1,
    activo: true,
  },
  {
    id: 4,
    nombre: "Diego Hernández",
    carrera: "Medicina",
    edad: 25,
    promedio: 8.3,
    activo: false,
  },
  {
    id: 5,
    nombre: "Valentina Torres",
    carrera: "Derecho",
    edad: 22,
    promedio: 9.4,
    activo: true,
  },
];

let siguienteId = 6;

// ─────────────────────────────────────────────
// GET /estudiantes — obtener todos los estudiantes
// ─────────────────────────────────────────────
app.get("/estudiantes", (req, res) => {
  res.status(200).json({
    mensaje: "Lista de estudiantes obtenida correctamente",
    total: estudiantes.length,
    datos: estudiantes,
  });
});

// ─────────────────────────────────────────────
// GET /estudiantes/:id — obtener un estudiante por ID
// ─────────────────────────────────────────────
app.get("/estudiantes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({
      mensaje: `No se encontró ningún estudiante con el ID ${id}`,
    });
  }

  res.status(200).json({
    mensaje: "Estudiante encontrado",
    datos: estudiante,
  });
});

// ─────────────────────────────────────────────
// POST /estudiantes — agregar un nuevo estudiante
// ─────────────────────────────────────────────
app.post("/estudiantes", (req, res) => {
  const { nombre, carrera, edad, promedio, activo } = req.body;

  if (!nombre || !carrera || edad === undefined || promedio === undefined) {
    return res.status(400).json({
      mensaje:
        "Faltan campos obligatorios. Se requieren: nombre, carrera, edad, promedio",
    });
  }

  if (typeof edad !== "number" || edad <= 0) {
    return res
      .status(400)
      .json({ mensaje: "El campo 'edad' debe ser un número positivo" });
  }

  if (typeof promedio !== "number" || promedio < 0 || promedio > 10) {
    return res.status(400).json({
      mensaje: "El campo 'promedio' debe ser un número entre 0 y 10",
    });
  }

  const nuevoEstudiante = {
    id: siguienteId++,
    nombre,
    carrera,
    edad,
    promedio,
    activo: activo !== undefined ? activo : true,
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json({
    mensaje: "Estudiante registrado exitosamente",
    datos: nuevoEstudiante,
  });
});

// ─────────────────────────────────────────────
// PUT /estudiantes/:id — actualizar un estudiante existente
// ─────────────────────────────────────────────
app.put("/estudiantes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = estudiantes.findIndex((e) => e.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: `No se encontró ningún estudiante con el ID ${id}`,
    });
  }

  const { nombre, carrera, edad, promedio, activo } = req.body;

  if (edad !== undefined && (typeof edad !== "number" || edad <= 0)) {
    return res
      .status(400)
      .json({ mensaje: "El campo 'edad' debe ser un número positivo" });
  }

  if (
    promedio !== undefined &&
    (typeof promedio !== "number" || promedio < 0 || promedio > 10)
  ) {
    return res.status(400).json({
      mensaje: "El campo 'promedio' debe ser un número entre 0 y 10",
    });
  }

  estudiantes[indice] = {
    ...estudiantes[indice],
    ...(nombre !== undefined && { nombre }),
    ...(carrera !== undefined && { carrera }),
    ...(edad !== undefined && { edad }),
    ...(promedio !== undefined && { promedio }),
    ...(activo !== undefined && { activo }),
  };

  res.status(200).json({
    mensaje: "Estudiante actualizado exitosamente",
    datos: estudiantes[indice],
  });
});

// ─────────────────────────────────────────────
// DELETE /estudiantes/:id — eliminar un estudiante
// ─────────────────────────────────────────────
app.delete("/estudiantes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = estudiantes.findIndex((e) => e.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: `No se encontró ningún estudiante con el ID ${id}`,
    });
  }

  const eliminado = estudiantes.splice(indice, 1)[0];

  res.status(200).json({
    mensaje: "Estudiante eliminado exitosamente",
    datos: eliminado,
  });
});

// ─────────────────────────────────────────────
// Ruta no encontrada
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada. Verifica el endpoint utilizado.",
  });
});

// ─────────────────────────────────────────────
// Iniciar servidor
// ─────────────────────────────────────────────
app.listen(PUERTO, () => {
  console.log(`Servidor de API Estudiantes corriendo en http://localhost:${PUERTO}`);
  console.log("Endpoints disponibles:");
  console.log("  GET    /estudiantes        → obtener todos");
  console.log("  GET    /estudiantes/:id    → obtener uno por ID");
  console.log("  POST   /estudiantes        → agregar nuevo estudiante");
  console.log("  PUT    /estudiantes/:id    → actualizar estudiante");
  console.log("  DELETE /estudiantes/:id    → eliminar estudiante");
});
