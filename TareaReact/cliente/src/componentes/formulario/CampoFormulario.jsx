function CampoFormulario({ etiqueta, nombre, valor, onChange, tipo = 'text', opciones = [], error, placeholder }) {
  const contenido = tipo === 'select' ? (
    <select name={nombre} value={valor} onChange={onChange}>
      <option value="">Selecciona una opción</option>
      {opciones.map((opcion) => (
        <option key={opcion} value={opcion}>
          {opcion}
        </option>
      ))}
    </select>
  ) : tipo === 'textarea' ? (
    <textarea name={nombre} value={valor} onChange={onChange} placeholder={placeholder} rows="4" />
  ) : (
    <input type={tipo} name={nombre} value={valor} onChange={onChange} placeholder={placeholder} />
  );

  return (
    <div className="campo">
      <label htmlFor={nombre}>{etiqueta}</label>
      {contenido}
      <span className="error">{error || ' '}</span>
    </div>
  );
}

export default CampoFormulario;
