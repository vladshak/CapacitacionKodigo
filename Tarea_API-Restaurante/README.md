# API Restaurante

Proyecto de ejemplo: API REST para un sistema de reservaciones de un restaurante.

**Descripción breve**

API que gestiona usuarios, autenticación JWT, mesas y reservaciones. Implementa control de roles (`cliente`, `admin`), protección de rutas mediante middleware, y persistencia mediante Prisma + PostgreSQL. Incluye documentación interactiva en `/api-docs` (Swagger UI) y una página estática informativa en la raíz.

**Características principales**

- Registro e inicio de sesión con contraseñas encriptadas (bcrypt) y tokens JWT.
- Roles: `cliente` (puede reservar y gestionar sus propias reservaciones) y `admin` (gestión de mesas y ver/editar reservaciones).
- CRUD para mesas con soft-delete (desactivar).
- Gestión de reservaciones con validación de disponibilidad por fecha y hora.
- Documentación OpenAPI disponible en `/api-docs`.

---

**Estructura del proyecto**

- `index.js` — Punto de entrada del servidor Express.
- `package.json` — Dependencias y scripts.
- `prisma/` — Archivos de Prisma (schema y cliente).
  - `prisma/schema.prisma` — Definición de modelos.
  - `prisma/client.js` — Exporta `PrismaClient`.
- `controller/` — Lógica de negocio por recurso (`auth.controller.js`, `mesa.controller.js`, `reservacion.controller.js`).
- `routes/` — Definición de rutas (`auth.routes.js`, `mesa.routes.js`, `reservacion.routes.js`).
- `middleware/` — Middlewares (por ejemplo `auth.middleware.js`).
- `public/` — Página estática e assets (index.html, styles.css).
- `swagger.json` — Especificación OpenAPI para Swagger UI.
- `.env.example` — Ejemplo de variables de entorno.

---

**Requisitos**

- Node.js v16+ (se recomienda v18+)
- npm
- PostgreSQL (o un servicio compatible)
- Acceso a Internet para descargar dependencias y Prisma engines (o disponer de engines locales)

---

**Instalación y configuración**

1. Clonar el repositorio:

```bash
git clone <REPO_URL>
cd Tarea_API-Restaurante
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear y editar el archivo de entorno a partir del ejemplo:

```bash
cp .env.example .env
# editar .env y colocar la URL correcta de la base de datos
```

4. Configurar `DATABASE_URL` en `.env` con el formato habitual de PostgreSQL:

```
DATABASE_URL="postgresql://usuario:password@host:puerto/nombre_base_de_datos"
PORT=3000
```

5. Generar cliente Prisma (requiere acceso a `binaries.prisma.sh` para descargar engines):

```bash
npx prisma generate
```

Si la descarga de engines falla por restricciones de red, use un entorno con acceso a internet o configure un proxy. Alternativamente, puede usar `PRISMA_QUERY_ENGINE_BINARY` para apuntar a un binario local (avanzado).

6. (Opcional) Ejecutar migraciones o importar el SQL de ejemplo:

- Si prefiere importar la base de datos de ejemplo, use el archivo `db/db_restaurante.sql` con su cliente psql o GUI para poblar tablas.

```bash
psql <CONEXION> -f db/db_restaurante.sql
```

- Si maneja migraciones con Prisma, asegúrese de haber definido correctamente el `schema.prisma` y ejecutar:

```bash
npx prisma migrate deploy
# o para crear una nueva migración (desarrollo):
# npx prisma migrate dev --name init
```

---

**Ejecutar la aplicación**

```bash
npm start
```

- Acceder a la UI pública (local): `http://localhost:3000/`
- Documentación Swagger (local): `http://localhost:3000/api-docs`
- Acceder a la UI pública (despliegue): https://exemplary-consideration-production-7490.up.railway.app/
- Documentación Swagger (despliegue): https://exemplary-consideration-production-7490.up.railway.app/api-docs

---

**Endpoints principales**

1. Autenticación (ruta base `/api/auth`)

- `POST /api/auth/register` — Registrar nuevo usuario (cliente).
  - Body: `{ "nombre": "..", "correo": "..", "password": ".." }`
  - Respuesta: `201` con usuario (sin password).

- `POST /api/auth/login` — Iniciar sesión.
  - Body: `{ "correo": "..", "password": ".." }`
  - Respuesta: `200` con `token` JWT.

- `GET /api/auth/perfil` — Perfil del usuario autenticado.
  - Header: `Authorization: Bearer <token>`

2. Mesas (ruta base `/api/mesas`)

- `GET /api/mesas` — Listar mesas. Soporta filtro `?disponible=true`.
- `GET /api/mesas/:id` — Detalle de mesa.
- `POST /api/mesas` — Crear mesa. Requiere token y rol `admin`.
- `PUT /api/mesas/:id` — Actualizar mesa. Requiere token y rol `admin`.
- `DELETE /api/mesas/:id` — Desactivar mesa (soft-delete). Requiere token y rol `admin`.

3. Reservaciones (ruta base `/api/reservaciones`)

- `POST /api/reservaciones` — Crear reservación (cliente autenticado).
  - Body: `{ "mesaId": 1, "fecha": "YYYY-MM-DD", "hora": "HH:MM:SS", "personas": 4 }`

- `GET /api/reservaciones/mis` — Obtener reservaciones del usuario autenticado.
- `GET /api/reservaciones` — Obtener todas las reservaciones (admin). Soporta filtros: `estado`, `fecha`, `mesaId`.
- `PUT /api/reservaciones/:id/estado` — Cambiar estado (admin). Body: `{ "estado": "confirmada" }`.
- `DELETE /api/reservaciones/:id` — Cancelar propia reservación (cliente autenticado).

---

**Ejemplos rápidos (curl)**

- Registro:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana","correo":"ana@email.com","password":"123456"}'

# Ejemplo (despliegue)
curl -X POST https://exemplary-consideration-production-7490.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana","correo":"ana@email.com","password":"123456"}'
```

- Login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correo":"ana@email.com","password":"123456"}'

# Ejemplo (despliegue)
curl -X POST https://exemplary-consideration-production-7490.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correo":"ana@email.com","password":"123456"}'
```

- Crear reservación (usar token del login):

```bash
curl -X POST http://localhost:3000/api/reservaciones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"mesaId":1,"fecha":"2026-07-10","hora":"19:00:00","personas":2}'

# Ejemplo (despliegue)
curl -X POST https://exemplary-consideration-production-7490.up.railway.app/api/reservaciones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"mesaId":1,"fecha":"2026-07-10","hora":"19:00:00","personas":2}'
```

---
