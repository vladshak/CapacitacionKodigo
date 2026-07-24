function EstadoErrorTabla({ mensaje, onReintentar }) {
  return (
    <div className="estado tabla-estado">
      <p className="mensaje-error">{mensaje}</p>
      <button className="boton-secundario" type="button" onClick={onReintentar}>
        Reintentar
      </button>
    </div>
  );
}

export default EstadoErrorTabla;
