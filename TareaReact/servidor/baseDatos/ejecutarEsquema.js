import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function ejecutarEsquema() {
  const conexion = await mysql.createConnection({
    host: process.env.MYSQLHOST || 'localhost',
    port: Number(process.env.MYSQLPORT || 3306),
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
  });

  const esquema = fs.readFileSync(path.resolve('baseDatos/esquema.sql'), 'utf8');
  await conexion.query(esquema);
  console.log('Esquema aplicado correctamente.');
  await conexion.end();
}

ejecutarEsquema().catch((error) => {
  console.error('No se pudo aplicar el esquema:', error.message);
  process.exit(1);
});
