function Encabezado({ onIrCatalogo }) {
  return (
    <section className="hero contenedor">
      <div className="hero-card">
        <p>GameVault</p>
        <h1>Tu catálogo de videojuegos, organizado y listo para descubrir.</h1>
        <p>Explora títulos, descubre nuevas experiencias y ayuda a enriquecer la colección con tus propios aportes.</p>
        <button className="boton" onClick={onIrCatalogo} type="button">Ver catálogo</button>
      </div>
      <div className="hero-card">
        <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80" alt="Consola de videojuegos" style={{ width: '100%', borderRadius: '20px' }} />
      </div>
    </section>
  );
}

export default Encabezado;
