import FormularioVideojuego from '../componentes/formulario/FormularioVideojuego.jsx';
import ListaVideojuegos from '../componentes/catalogo/ListaVideojuegos.jsx';

function PaginaCatalogo({ onVolver }) {
  return (
    <main className="contenedor catalogo">
      <div className="fila" style={{ marginBottom: '1.5rem' }}>
        <h1>Catálogo de videojuegos</h1>
        <button className="boton-secundario" onClick={onVolver} type="button">Volver</button>
      </div>
      <div className="formulario-panel">
        <section>
          <ListaVideojuegos />
        </section>
        <FormularioVideojuego />
      </div>
    </main>
  );
}

export default PaginaCatalogo;
