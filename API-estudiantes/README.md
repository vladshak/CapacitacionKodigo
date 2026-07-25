# 📚 API REST — Estudiantes

API REST construida con **Node.js** y **Express 5** para la administración de estudiantes. Permite realizar operaciones CRUD completas sobre un listado de estudiantes almacenado en memoria.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión |
| ---------- | ------- |
| Node.js    | ≥ 18.x  |
| Express    | ^5.2.1  |

---

## 📁 Estructura del proyecto

```
api-estudiantes/
├── index.js        # Servidor principal y definición de endpoints
└── package.json    # Configuración del proyecto y dependencias
└── README.md
```

---

## ⚙️ Instalación y configuración

### 1. Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd api-estudiantes
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor

**Modo producción:**

```bash
npm start
```

**Modo desarrollo** (reinicio automático al guardar cambios):

```bash
npm run dev
```

El servidor quedará escuchando en:

```
http://localhost:3000
```

Para comprobar en servidor en linea:

```
https://capacitacionkodigo-production-1282.up.railway.app/
```

---

## 📦 Modelo de datos

Cada estudiante tiene la siguiente estructura:

```json
{
  "id": 1,
  "nombre": "Ana Martínez",
  "carrera": "Ingeniería en Sistemas",
  "edad": 21,
  "promedio": 8.7,
  "activo": true
}
```

| Campo      | Tipo      | Obligatorio | Descripción                             |
| ---------- | --------- | :---------: | --------------------------------------- |
| `id`       | `number`  |    Auto     | Identificador único (autoincremental)   |
| `nombre`   | `string`  |     ✅      | Nombre completo del estudiante          |
| `carrera`  | `string`  |     ✅      | Carrera que cursa                       |
| `edad`     | `number`  |     ✅      | Edad en años (debe ser positiva)        |
| `promedio` | `number`  |     ✅      | Promedio académico (0–10)               |
| `activo`   | `boolean` |     ❌      | Estado del estudiante (default: `true`) |

> **Nota:** Los datos se almacenan **en memoria**. Al reiniciar el servidor, se restauran los 5 estudiantes de ejemplo iniciales.

---

## 🔗 Endpoints disponibles

**Base URL:** `http://localhost:3000`\
**Base ONLINE:** `https://capacitacionkodigo-production-1282.up.railway.app/`

---

### 📋 GET `/estudiantes`

Obtiene el listado completo de todos los estudiantes registrados.

**Request:**

```
GET http://localhost:3000/estudiantes
```

```
GET https://capacitacionkodigo-production-1282.up.railway.app/estudiantes/
```

**Response exitoso `200 OK`:**

```json
{
  "mensaje": "Lista de estudiantes obtenida correctamente",
  "total": 5,
  "datos": [
    {
      "id": 1,
      "nombre": "Ana Martínez",
      "carrera": "Ingeniería en Sistemas",
      "edad": 21,
      "promedio": 8.7,
      "activo": true
    }
  ]
}
```

---

### 🔍 GET `/estudiantes/:id`

Obtiene un estudiante específico por su ID.

**Request:**

```
GET http://localhost:3000/estudiantes/1
```

```
GET https://capacitacionkodigo-production-1282.up.railway.app/estudiantes/1
```

**Response exitoso `200 OK`:**

```json
{
  "mensaje": "Estudiante encontrado",
  "datos": {
    "id": 1,
    "nombre": "Ana Martínez",
    "carrera": "Ingeniería en Sistemas",
    "edad": 21,
    "promedio": 8.7,
    "activo": true
  }
}
```

**Response error `404 Not Found`:**

```json
{
  "mensaje": "No se encontró ningún estudiante con el ID 99"
}
```

---

### ➕ POST `/estudiantes`

Registra un nuevo estudiante en el sistema.

**Request:**

```
POST http://localhost:3000/estudiantes
```

```
POST https://capacitacionkodigo-production-1282.up.railway.app/estudiantes
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "nombre": "Luis Pérez",
  "carrera": "Contabilidad",
  "edad": 20,
  "promedio": 8.5,
  "activo": true
}
```

> El campo `activo` es opcional; si se omite, se asigna `true` por defecto.

**Response exitoso `201 Created`:**

```json
{
  "mensaje": "Estudiante registrado exitosamente",
  "datos": {
    "id": 6,
    "nombre": "Luis Pérez",
    "carrera": "Contabilidad",
    "edad": 20,
    "promedio": 8.5,
    "activo": true
  }
}
```

**Response error `400 Bad Request` — campos faltantes:**

```json
{
  "mensaje": "Faltan campos obligatorios. Se requieren: nombre, carrera, edad, promedio"
}
```

**Response error `400 Bad Request` — edad inválida:**

```json
{
  "mensaje": "El campo 'edad' debe ser un número positivo"
}
```

**Response error `400 Bad Request` — promedio fuera de rango:**

```json
{
  "mensaje": "El campo 'promedio' debe ser un número entre 0 y 10"
}
```

---

### ✏️ PUT `/estudiantes/:id`

Actualiza los datos de un estudiante existente. Se pueden enviar solo los campos que se desean modificar.

**Request:**

```
PUT http://localhost:3000/estudiantes/1
```

```
PUT https://capacitacionkodigo-production-1282.up.railway.app/estudiantes/1
Content-Type: application/json
```

**Body (JSON) — solo los campos a actualizar:**

```json
{
  "promedio": 9.0,
  "activo": false
}
```

**Response exitoso `200 OK`:**

```json
{
  "mensaje": "Estudiante actualizado exitosamente",
  "datos": {
    "id": 1,
    "nombre": "Ana Martínez",
    "carrera": "Ingeniería en Sistemas",
    "edad": 21,
    "promedio": 9.0,
    "activo": false
  }
}
```

**Response error `404 Not Found`:**

```json
{
  "mensaje": "No se encontró ningún estudiante con el ID 99"
}
```

---

### 🗑️ DELETE `/estudiantes/:id`

Elimina un estudiante del sistema por su ID.

**Request:**

```
DELETE http://localhost:3000/estudiantes/1
```

```
DELETE https://capacitacionkodigo-production-1282.up.railway.app/estudiantes/1
```

**Response exitoso `200 OK`:**

```json
{
  "mensaje": "Estudiante eliminado exitosamente",
  "datos": {
    "id": 1,
    "nombre": "Ana Martínez",
    "carrera": "Ingeniería en Sistemas",
    "edad": 21,
    "promedio": 8.7,
    "activo": true
  }
}
```

**Response error `404 Not Found`:**

```json
{
  "mensaje": "No se encontró ningún estudiante con el ID 99"
}
```

---

## 📊 Resumen de endpoints

| Método   | Endpoint           | Descripción                        | Código éxito |
| -------- | ------------------ | ---------------------------------- | :----------: |
| `GET`    | `/estudiantes`     | Obtener todos los estudiantes      |    `200`     |
| `GET`    | `/estudiantes/:id` | Obtener un estudiante por ID       |    `200`     |
| `POST`   | `/estudiantes`     | Registrar un nuevo estudiante      |    `201`     |
| `PUT`    | `/estudiantes/:id` | Actualizar un estudiante existente |    `200`     |
| `DELETE` | `/estudiantes/:id` | Eliminar un estudiante             |    `200`     |

---

## ⚠️ Códigos de respuesta HTTP

| Código | Significado                                        |
| ------ | -------------------------------------------------- |
| `200`  | Operación realizada exitosamente                   |
| `201`  | Recurso creado exitosamente                        |
| `400`  | Solicitud incorrecta (datos faltantes o inválidos) |
| `404`  | Estudiante no encontrado / Ruta no existente       |

---

## 🧪 Pruebas con Thunder Client o Postman

Puedes probar todos los endpoints importando las siguientes URLs base:

```
http://localhost:3000/estudiantes
```

```
http://localhost:3000/estudiantes/1
```

```
https://capacitacionkodigo-production-1282.up.railway.app/estudiantes
```

```
https://capacitacionkodigo-production-1282.up.railway.app/estudiantes/1
```

Asegúrate de configurar el header `Content-Type: application/json` en las peticiones `POST` y `PUT`.

---

## 👨‍🏫 Autor

Desarrollado como práctica educativa en el
**Curso de Transformación Digital para la Docencia Técnica** \
_Aníbal Vladimir Martínez Rodríguez_
