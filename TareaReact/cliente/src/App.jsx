import { useState } from 'react';
import PaginaInicio from './paginas/PaginaInicio.jsx';
import PaginaCatalogo from './paginas/PaginaCatalogo.jsx';

function App() {
  const [vistaActual, establecerVistaActual] = useState('inicio');

  return (
    <div className="aplicacion">
      {vistaActual === 'inicio' ? (
        <PaginaInicio onIrCatalogo={() => establecerVistaActual('catalogo')} />
      ) : (
        <PaginaCatalogo onVolver={() => establecerVistaActual('inicio')} />
      )}
    </div>
  );
}

export default App;
