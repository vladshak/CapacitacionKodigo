# **¡Bienvenido a la Transformación Digital para la Docencia Técnica!**

Este repositorio documenta el avance y aprendizaje práctico durante la capacitación **Kodigo – Transformación Digital para la Docencia Técnica** (Kodigo / INSAL 2026).

Recopila ejercicios y proyectos enfocados en **desarrollo web frontend**, **backend**, **bases de datos** y **despliegue en la nube**.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3 (Flexbox, Grid, Animaciones), JavaScript, React, Vite
- **Backend**: Node.js, Express
- **Base de Datos**: PostgreSQL, MySQL, Prisma
- **Herramientas**: Git, GitHub, Railway, Swagger

---

## Cómo navegar

- Las carpetas de frontend puro (`html_css`, `flex_grid`, `landingPage`, `tareaFrontend`) se pueden abrir directamente en el navegador.
- Las APIs requieren `npm install` y configuración de variables de entorno.
- El proyecto más completo full-stack es **`TareaReact/` (GameVault)**.

---

## 🗂️ Estructura del Repositorio

### 📁 `html_css/`

Práctica básica de **HTML5 y CSS3**.

- **Objetivo**: Crear una receta estilizada (`Simple Omelette Recipe`).
- Incluye: estructura semántica, listas, tablas, imágenes y diseño responsivo.
- **Archivos principales**: [`index.html`](html_css/index.html) + [`css/style.css`](html_css/css/style.css)

### 📁 `flex_grid/`

Demostración práctica de **Flexbox** y **CSS Grid**.

- **Objetivo**: Dominar técnicas modernas de maquetación.
- **Archivos principales**: [`index.html`](flex_grid/index.html) + [`style.css`](flex_grid/style.css)

### 📁 `landingPage/`

Landing page completa sobre la **historia de los videojuegos** (siglo XXI).

- **Tecnologías**: HTML5 + CSS3 avanzado (animaciones, grid, efectos).
- Incluye: hero section, timeline, galería de juegos, etc.
- **Archivos principales**: [`index.html`](landingPage/index.html) + [`style.css`](landingPage/style.css)

### 📁 `tareaFrontend/`

**Proyecto final del módulo Frontend** – Versión avanzada e interactiva.

- Tema: **GameVerse**
- Incluye **JavaScript** para navegación tipo SPA.
- **Archivos principales**: [`index.html`](tareaFrontend/index.html), [`style.css`](tareaFrontend/style.css)

### 📁 `Base_Datos/`

Prácticas de **Bases de Datos Relacionales** (PostgreSQL).

- **Archivo**: [`consultas_accommodations.sql`](Base_Datos/consultas_accommodations.sql)
- Contenido: INSERT avanzados (CTEs), JOINs, UPDATE, DELETE, agregaciones y consultas complejas sobre gestión de alojamientos turísticos.

### 📁 `API-estudiantes/`

**API REST** completa para gestión de estudiantes.

- **Tecnologías**: Node.js + Express
- Funcionalidades: CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Datos almacenados en memoria
- **Deploy en Railway**: [https://capacitacionkodigo-production-1282.up.railway.app/](https://capacitacionkodigo-production-1282.up.railway.app/)
- **Archivos principales**: [`index.js`](API-estudiantes/index.js), [`package.json`](API-estudiantes/package.json)
- Ver documentación detallada → [`README.md`](API-estudiantes/README.md)

### 📁 `API-Restaurante/`

API de ejemplo para un sistema de restaurante (versión base).

- **Tecnologías**: Node.js + Express + Prisma
- Estructura con controladores, rutas y modelos Prisma.

### 📁 `Tarea_API-Restaurante/`

**API REST completa de Reservaciones de Restaurante**.

- Autenticación JWT + roles (cliente / admin)
- CRUD de mesas y reservaciones
- Validación de disponibilidad
- Documentación Swagger en `/api-docs`
- **Deploy**: [https://exemplary-consideration-production-7490.up.railway.app/](https://exemplary-consideration-production-7490.up.railway.app/)
- **Swagger**: [https://exemplary-consideration-production-7490.up.railway.app/api-docs](https://exemplary-consideration-production-7490.up.railway.app/api-docs)
- Ver documentación detallada → [`README.md`](Tarea_API-Restaurante/README.md)

### 📁 `TareaReact/` — **GameVault** (Proyecto Full-Stack destacado)

Aplicación web completa con **React + Express + MySQL** para gestionar un catálogo de videojuegos.

#### Demo en producción

| Capa                 | URL                                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Frontend (React)** | [https://content-fascination-production-b3c6.up.railway.app/](https://content-fascination-production-b3c6.up.railway.app/) |
| **API REST**         | [https://capacitacionkodigo-production.up.railway.app/api/](https://capacitacionkodigo-production.up.railway.app/api/)     |

#### Funcionalidades principales

- Landing page informativa
- Catálogo de videojuegos con paginación
- Formulario controlado con validaciones dinámicas
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Estados de carga, error y vacío
- API propia en Express conectada a MySQL (con fallback en memoria)
- Ver documentación completa → TareaReact/README.md

### 📌 Resumen de despliegues

| Proyecto               | Frontend   | Backend/API |
| ---------------------- | ---------- | ----------- |
| GameVault (TareaReact) | Demo React | API         |
| API Estudiantes        | —          | API         |
| API Restaurante        | UI         | Swagger     |

---

Actualizado: Julio 2026
