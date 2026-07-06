# API REST con autenticación JWT, encriptación bcrypt, roles y permisos, documentada con Swagger/Postman. Repositorio en GitHub.

## Propósito de Aplicación

Desarrollar una API REST profesional utilizando autenticación JWT, encriptación de contraseñas con bcrypt, manejo de roles y permisos, validación de acceso mediante middleware y documentación interactiva con Swagger/Postman.

Esta actividad permite aplicar conceptos reales utilizados en sistemas backend modernos, integrando seguridad, control de acceso y despliegue de servicios en la nube.

## Actividad del programa

### Descripción de la actividad

El restaurante necesita un sistema digital para que sus clientes hagan reservaciones de mesas en línea, y para que el personal administrador gestione el estado de cada reserva.

La API debe resolver los siguientes casos de uso:

Los clientes se registran, inician sesión y hacen reservaciones eligiendo mesa, fecha, hora y número de comensales.
El sistema valida que la mesa no esté ocupada en el mismo bloque de fecha y hora antes de confirmar.
Los administradores pueden ver todas las reservaciones, cambiar su estado y gestionar el catálogo de mesas.
Toda la API está documentada e interactiva en /api-docs mediante Swagger UI.

### Requerimientos Técnicos

- swagger-ui-express
- Prisma como ORM
- MetroUI como framework de diseño
- Node.js
- Base de datos: Postgres (archivo db_restaurante.sql)

## Estructura de la API

### Endpoints requeridos

#### Autenticación — /api/auth

| Método | Endpoint           | Descripción                         | Acceso  |
| ------ | ------------------ | ----------------------------------- | ------- |
| POST   | /api/auth/register | Registro de nuevo usuario (cliente) | Público |
| POST   | /api/auth/login    | Login — devuelve JWT firmado        | Público |
| GET    | /api/auth/perfil   | Datos del usuario autenticado       | Cliente |

#### Mesas — /api/mesas

| Método | Endpoint       | Descripción                          | Acceso  |
| ------ | -------------- | ------------------------------------ | ------- |
| GET    | /api/mesas     | Listar mesas (filtro disponibilidad) | Público |
| GET    | /api/mesas/:id | Detalle de una mesa                  | Público |
| POST   | /api/mesas     | Crear nueva mesa                     | Admin   |
| PUT    | /api/mesas/:id | Actualizar datos de mesa             | Admin   |
| DELETE | /api/mesas/:id | Desactivar mesa (soft delete)        | Admin   |

#### Reservaciones — /api/reservaciones

| Método | Endpoint                      | Descripción                               | Acceso  |
| ------ | ----------------------------- | ----------------------------------------- | ------- |
| POST   | /api/reservaciones            | Crear reservación (valida disponibilidad) | Cliente |
| GET    | /api/reservaciones/mis        | Mis reservaciones (usuario actual)        | Cliente |
| GET    | /api/reservaciones            | Todas las reservaciones con filtros       | Admin   |
| PUT    | /api/reservaciones/:id/estado | Cambiar estado de reservación             | Admin   |
| DELETE | /api/reservaciones/:id        | Cancelar propia reservación               | Cliente |

## Extras

- Todas las funciones, declaracion de variables, comentarios en el codigo en español
- Aplica buenas practicas de programacion
- Agrega un diseño de colores degradados (azul, celeste, amarillo, lima)
- Agrega un diseño responsive con grid y flexbox
