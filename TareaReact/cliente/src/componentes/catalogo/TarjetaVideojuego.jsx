function TarjetaVideojuego({ videojuego }) {
  return (
    <article className="tarjeta">
      <img src={videojuego.urlImagen} alt={videojuego.titulo} />
      <div className="fila">
        <h3>{videojuego.titulo}</h3>
        <span>{videojuego.calificacion.toFixed(1)} / 10</span>
      </div>
      <p><strong>Plataforma:</strong> {videojuego.plataforma}</p>
      <p><strong>Género:</strong> {videojuego.genero}</p>
      <p><strong>Año:</strong> {videojuego.anioLanzamiento}</p>
      <p><strong>Desarrollador:</strong> {videojuego.desarrollador}</p>
      <p>{videojuego.descripcion}</p>
    </article>
  );
}

export default TarjetaVideojuego;
