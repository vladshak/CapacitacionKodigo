function CampoFormulario({
  etiqueta,
  nombre,
  valor,
  onChange,
  tipo = "text",
  opciones = [],
  error,
  placeholder,
  disabled = false,
}) {
  const contenido =
    tipo === "select" ? (
      <select
        name={nombre}
        value={valor}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">Selecciona una opción</option>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    ) : tipo === "textarea" ? (
      <textarea
        name={nombre}
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
        disabled={disabled}
      />
    ) : (
      <input
        type={tipo}
        name={nombre}
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    );

  return (
    <div className="campo">
      <label htmlFor={nombre}>{etiqueta}</label>
      {contenido}
      <span className="error">{error || " "}</span>
    </div>
  );
}

export default CampoFormulario;
