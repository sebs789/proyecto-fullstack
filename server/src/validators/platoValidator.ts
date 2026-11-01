import { CATEGORIAS, type Categoria, type PlatoInput } from '../types/plato';

type Resultado =
    | { ok: true; datos: PlatoInput }
    | { ok: false; errores: string[] };

const texto = (valor: unknown): string => (typeof valor === 'string' ? valor.trim() : '');

export const validarPlato = (body: unknown): Resultado => {
    const errores: string[] = [];

    if (typeof body !== 'object' || body === null) {
        return { ok: false, errores: ['Debes enviar los datos del plato en formato JSON'] };
    }
    const datos = body as Record<string, unknown>;

    const nombre = texto(datos.nombre);
    if (nombre.length < 2 || nombre.length > 100) {
        errores.push('El nombre es obligatorio (entre 2 y 100 caracteres)');
    }

    const categoria = texto(datos.categoria);
    if (!(CATEGORIAS as readonly string[]).includes(categoria)) {
        errores.push(`La categoría debe ser una de: ${CATEGORIAS.join(', ')}`);
    }

    const descripcion = texto(datos.descripcion);
    if (descripcion.length < 5 || descripcion.length > 500) {
        errores.push('La descripción es obligatoria (entre 5 y 500 caracteres)');
    }

    const precio = Number(datos.precio);
    if (datos.precio === '' || datos.precio === null || !Number.isFinite(precio) || precio <= 0 || precio > 9999) {
        errores.push('El precio debe ser un número mayor que 0 y menor que 10000');
    }

    const tiempo = Number(datos.tiempo_preparacion);
    if (datos.tiempo_preparacion === '' || !Number.isInteger(tiempo) || tiempo < 1 || tiempo > 300) {
        errores.push('El tiempo de preparación debe ser un número entero entre 1 y 300 minutos');
    }

    const imagen = texto(datos.imagen);
    if (imagen.length === 0 || imagen.length > 255) {
        errores.push('La imagen es obligatoria (ejemplo: /Eventos/lomo.jpg)');
    }

    if (errores.length > 0) {
        return { ok: false, errores };
    }

    return {
        ok: true,
        datos: {
            nombre,
            categoria: categoria as Categoria,
            descripcion,
            precio: Math.round(precio * 100) / 100,
            tiempo_preparacion: tiempo,
            imagen,
        },
    };
};
