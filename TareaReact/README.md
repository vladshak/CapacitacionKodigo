# GameVault

Aplicación web full-stack para gestionar un catálogo de videojuegos.  
Desarrollada como práctica de la capacitación **Kodigo – Transformación Digital para la Docencia Técnica**.

---

## 🚀 Demo en producción

| Capa                 | URL                                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Frontend (React)** | [https://content-fascination-production-b3c6.up.railway.app/](https://content-fascination-production-b3c6.up.railway.app/) |
| **API REST**         | [https://capacitacionkodigo-production.up.railway.app/api/](https://capacitacionkodigo-production.up.railway.app/api/)     |

> Endpoint principal de videojuegos:  
> `https://capacitacionkodigo-production.up.railway.app/api/videojuegos`

---

## 📋 Descripción del proyecto

**GameVault** permite:

- Visualizar un catálogo de videojuegos con paginación
- Registrar nuevos videojuegos
- Ver detalle de cada juego
- Editar información existente
- Eliminar videojuegos (con confirmación)
- Validaciones tanto en frontend como en backend
- Estados de carga, error y vacío

El frontend está construido con **React + Vite** y el backend con **Node.js + Express + MySQL**.

---

## 🛠️ Tecnologías utilizadas

### Frontend (`cliente/`)

- React 18
- Vite
- Hooks personalizados
- CSS personalizado
- Fetch API

### Backend (`servidor/`)

- Node.js
- Express
- MySQL2
- CORS
- Dotenv

### Base de datos

- MySQL
- Tabla `videojuegos` con constraints de validación

---

## 📁 Estructura del proyecto

TareaReact/
├── cliente/ # Frontend React (Vite)
│ ├── src/
│ │ ├── componentes/
│ │ │ ├── catalogo/ # Lista, tarjetas, paginación, estados
│ │ │ ├── comunes/ # Modal y ModalConfirmacion
│ │ │ ├── formulario/ # Formulario controlado + validaciones
│ │ │ └── landing/ # Secciones de la página de inicio
│ │ ├── hooks/ # Hooks personalizados (CRUD + validación)
│ │ ├── paginas/ # PaginaInicio y PaginaCatalogo
│ │ ├── servicios/ # Llamadas a la API
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── estilos.css
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── servidor/ # Backend Express
│ ├── baseDatos/
│ │ ├── conexion.js
│ │ ├── esquema.sql
│ │ └── ejecutarEsquema.js
│ ├── controladores/
│ │ └── videojuegos.controlador.js
│ ├── rutas/
│ │ └── videojuegos.rutas.js
│ ├── validaciones/
│ │ └── videojuegos.validacion.js
│ ├── index.js
│ └── package.json
│
├── .gitignore
└── README.md

---

## ✨ Funcionalidades

### Landing page

- Encabezado atractivo
- Sección “Acerca de”
- Llamado a la acción para ir al catálogo

### Catálogo de videojuegos

- Listado con paginación
- Vista de tarjetas / filas
- Estados: cargando, error, vacío
- Ver detalle en modal
- Editar videojuego
- Eliminar con confirmación

### Formulario controlado

- Validaciones dinámicas en tiempo real
- Campos:
  - Título (3-80 caracteres)
  - Plataforma
  - Género
  - Año de lanzamiento (1970 - año actual)
  - Desarrollador
  - URL de imagen
  - Descripción (20-500 caracteres)
  - Calificación (0.0 - 10.0)

### API REST

| Método   | Endpoint               | Descripción                                |
| -------- | ---------------------- | ------------------------------------------ |
| `GET`    | `/api/videojuegos`     | Listar con paginación (`?pagina=&limite=`) |
| `GET`    | `/api/videojuegos/:id` | Obtener un videojuego                      |
| `POST`   | `/api/videojuegos`     | Crear videojuego                           |
| `PUT`    | `/api/videojuegos/:id` | Actualizar videojuego                      |
| `DELETE` | `/api/videojuegos/:id` | Eliminar videojuego                        |

> El backend incluye fallback en memoria si no hay conexión a MySQL.

---

## ⚙️ Ejecución local

### Requisitos previos

- Node.js 18+
- MySQL corriendo localmente

### 1. Servidor (API)

```bash
cd servidor
npm install
```

Crea el archivo .env dentro de servidor/:

envMYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=tu_password
MYSQLDATABASE=gamevault
PORT=4000

Ejecuta la migración (crea la base de datos y la tabla):

```bash
npm run migrar
```

Inicia el servidor:

```bash
npm start
```

El servidor quedará disponible en: http://localhost:4000

### 2. Cliente (React)

```bash
cd cliente
npm install
```

Crea el archivo .env.local dentro de cliente/:

envVITE_URL_API=http://localhost:4000/api

Inicia el frontend:

```bash
npm run dev
```

La aplicación quedará disponible en: http://localhost:5173

## 🗄️ Modelo de datos

SQLCREATE TABLE videojuegos (
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(80) NOT NULL,
plataforma VARCHAR(40) NOT NULL,
genero VARCHAR(40) NOT NULL,
anio_lanzamiento SMALLINT NOT NULL,
desarrollador VARCHAR(60) NOT NULL,
url_imagen VARCHAR(255) NOT NULL,
descripcion TEXT NOT NULL,
calificacion DECIMAL(3,1) NOT NULL,
creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT chk_anio CHECK (anio_lanzamiento BETWEEN 1970 AND 2100),
CONSTRAINT chk_calificacion CHECK (calificacion BETWEEN 0 AND 10),
CONSTRAINT chk_titulo CHECK (CHAR_LENGTH(titulo) BETWEEN 3 AND 80),
CONSTRAINT chk_descripcion CHECK (CHAR_LENGTH(descripcion) BETWEEN 20 AND 500)
);

## 🔗 Enlaces de producción

Frontend: https://content-fascination-production-b3c6.up.railway.app/
API REST: https://capacitacionkodigo-production.up.railway.app/api/

## 📝 Notas

El frontend está desplegado en Railway usando el script serve sobre la carpeta dist.
El backend tiene fallback a datos en memoria en caso de que falle la conexión a MySQL.
Proyecto realizado como parte de la capacitación Kodigo (actualización digital).

Autor: Vladshak
Capacitación: Kodigo – Transformación Digital para la Docencia Técnica
