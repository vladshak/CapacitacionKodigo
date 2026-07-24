const urlBase = import.meta.env.VITE_URL_API || "http://localhost:4000/api";

export async function obtenerVideojuegos(pagina = 1, limite = 5) {
  const respuesta = await fetch(
    `${urlBase}/videojuegos?pagina=${pagina}&limite=${limite}`,
  );
  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los videojuegos.");
  }
  return respuesta.json();
}

export async function obtenerVideojuegoPorId(id) {
  const respuesta = await fetch(`${urlBase}/videojuegos/${id}`);
  if (!respuesta.ok) {
    const cuerpo = await respuesta.json();
    throw new Error(cuerpo.mensaje || "No se pudo cargar el videojuego.");
  }
  return respuesta.json();
}

export async function crearVideojuego(datos) {
  const respuesta = await fetch(`${urlBase}/videojuegos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json();
    throw new Error(cuerpo.mensaje || "No se pudo guardar el videojuego.");
  }

  return respuesta.json();
}

export async function actualizarVideojuego(id, datos) {
  const respuesta = await fetch(`${urlBase}/videojuegos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json();
    throw new Error(cuerpo.mensaje || "No se pudo actualizar el videojuego.");
  }

  return respuesta.json();
}

export async function eliminarVideojuego(id) {
  const respuesta = await fetch(`${urlBase}/videojuegos/${id}`, {
    method: "DELETE",
  });
  if (!respuesta.ok) {
    const cuerpo = await respuesta.json();
    throw new Error(cuerpo.mensaje || "No se pudo eliminar el videojuego.");
  }
  return respuesta.json();
}
