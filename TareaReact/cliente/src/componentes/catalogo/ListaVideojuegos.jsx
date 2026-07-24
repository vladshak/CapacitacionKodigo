import EstadoCargando from './EstadoCargando.jsx';
import EstadoError from './EstadoError.jsx';
import EstadoVacio from './EstadoVacio.jsx';
import TarjetaVideojuego from './TarjetaVideojuego.jsx';
import { useVideojuegos } from '../../hooks/useVideojuegos.js';

function ListaVideojuegos() {
  const { videojuegos, estado, mensajeError, recargar } = useVideojuegos();

  if (estado === 'cargando') {
    return <EstadoCargando />;
  }

  if (estado === 'error') {
    return <EstadoError mensaje={mensajeError} onReintentar={recargar} />;
  }

  if (videojuegos.length === 0) {
    return <EstadoVacio />;
  }

  return (
    <div className="grid-3">
      {videojuegos.map((videojuego) => (
        <TarjetaVideojuego key={videojuego.id} videojuego={videojuego} />
      ))}
    </div>
  );
}

export default ListaVideojuegos;
