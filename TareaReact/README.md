# GameVault

Aplicación web con React, Express y MySQL para gestionar un catálogo de videojuegos.

## Funcionalidades
- Landing page informativa.
- Catálogo de videojuegos con estados de carga, éxito y error.
- Formulario controlado con validaciones dinámicas.
- API propia en Express conectada a MySQL.

## Ejecución local

### Servidor
```bash
cd servidor
npm install
npm start
```

### Cliente
```bash
cd cliente
npm install
npm run dev
```

## Variables de entorno
Crea un archivo .env dentro de servidor con:
```env
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=gamevault
PORT=4000
```

Y un archivo .env.local dentro de cliente con:
```env
VITE_URL_API=http://localhost:4000/api
```

## Base de datos
Ejecuta el esquema SQL con:
```bash
cd servidor
npm run migrar
```
