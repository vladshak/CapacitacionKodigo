import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const configuracionConexion = {
  host: process.env.MYSQLHOST || "localhost",
  port: Number(process.env.MYSQLPORT || 3306),
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "gamevault",
  waitForConnections: true,
  connectionLimit: 10,
};

const poolConexion = mysql.createPool(configuracionConexion);

export default poolConexion;
