function EstadoError({ mensaje, onReintentar }) {
  return (
    <div className="estado">
      <p className="mensaje-error">{mensaje}</p>
      <button className="boton-secundario" onClick={onReintentar} type="button">
        Reintentar
      </button>
    </div>
  );
}

export default EstadoError;
