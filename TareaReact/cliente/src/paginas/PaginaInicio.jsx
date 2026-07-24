import Encabezado from '../componentes/landing/Encabezado.jsx';
import SeccionAcercaDe from '../componentes/landing/SeccionAcercaDe.jsx';
import SeccionLlamadoAccion from '../componentes/landing/SeccionLlamadoAccion.jsx';

function PaginaInicio({ onIrCatalogo }) {
  return (
    <>
      <Encabezado onIrCatalogo={onIrCatalogo} />
      <SeccionAcercaDe />
      <SeccionLlamadoAccion onIrCatalogo={onIrCatalogo} />
    </>
  );
}

export default PaginaInicio;
