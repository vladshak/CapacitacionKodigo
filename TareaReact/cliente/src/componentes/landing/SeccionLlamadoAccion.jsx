function SeccionLlamadoAccion({ onIrCatalogo }) {
  return (
    <section className="seccion contenedor">
      <div className="panel" style={{ textAlign: 'center' }}>
        <h2>Descubre el catálogo completo</h2>
        <p>Ve todos los videojuegos guardados y agrega nuevos títulos desde un formulario simple y validado.</p>
        <button className="boton" onClick={onIrCatalogo} type="button">Ir al catálogo</button>
      </div>
    </section>
  );
}

export default SeccionLlamadoAccion;
