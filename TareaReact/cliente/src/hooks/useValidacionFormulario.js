import { useMemo } from 'react';
import { reglasFormulario } from '../componentes/formulario/reglasFormulario.js';

export function useValidacionFormulario(valores) {
  const errores = useMemo(() => {
    const resultado = {};
    const anioActual = new Date().getFullYear();

    Object.entries(reglasFormulario).forEach(([campo, regla]) => {
      const valor = valores[campo];
      const mensaje = validarCampo(campo, valor, regla, anioActual);
      if (mensaje) {
        resultado[campo] = mensaje;
      }
    });

    return resultado;
  }, [valores]);

  const esValido = Object.keys(errores).length === 0 && Object.values(valores).every((valor) => {
    if (typeof valor === 'string') return valor.trim() !== '';
    return valor !== '' && valor !== undefined && valor !== null;
  });

  return { errores, esValido };
}

function validarCampo(campo, valor, regla, anioActual) {
  if (campo === 'titulo') {
    if (!valor || valor.trim().length < 3 || valor.trim().length > 80) {
      return regla.mensaje;
    }
  }

  if (campo === 'plataforma') {
    if (!valor || !regla.opciones.includes(valor)) {
      return regla.mensaje;
    }
  }

  if (campo === 'genero') {
    if (!valor || !regla.opciones.includes(valor)) {
      return regla.mensaje;
    }
  }

  if (campo === 'anioLanzamiento') {
    const anio = Number(valor);
    if (!Number.isInteger(anio) || anio < 1970 || anio > anioActual) {
      return regla.mensaje.replace('{anioActual}', anioActual);
    }
  }

  if (campo === 'desarrollador') {
    if (!valor || valor.trim().length < 2 || valor.trim().length > 60) {
      return regla.mensaje;
    }
  }

  if (campo === 'urlImagen') {
    try {
      new URL(valor);
    } catch {
      return regla.mensaje;
    }
  }

  if (campo === 'descripcion') {
    if (!valor || valor.trim().length < 20 || valor.trim().length > 500) {
      return regla.mensaje;
    }
  }

  if (campo === 'calificacion') {
    const calificacion = Number(valor);
    if (Number.isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
      return regla.mensaje;
    }
  }

  return '';
}
