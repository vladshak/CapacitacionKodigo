const urlBase = import.meta.env.VITE_URL_API || 'http://localhost:4000/api';

export async function obtenerVideojuegos() {
  const respuesta = await fetch(`${urlBase}/videojuegos`);
  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los videojuegos.');
  }
  return respuesta.json();
}

export async function crearVideojuego(datos) {
  const respuesta = await fetch(`${urlBase}/videojuegos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json();
    throw new Error(cuerpo.mensaje || 'No se pudo guardar el videojuego.');
  }

  return respuesta.json();
}
