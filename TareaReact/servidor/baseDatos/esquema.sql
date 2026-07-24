CREATE DATABASE IF NOT EXISTS gamevault;
USE gamevault;

CREATE TABLE IF NOT EXISTS videojuegos (
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
