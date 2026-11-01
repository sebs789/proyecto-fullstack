export interface RegistroInput {
    nombre: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

type Resultado<T> = { ok: true; datos: T } | { ok: false; errores: string[] };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const texto = (valor: unknown): string => (typeof valor === 'string' ? valor.trim() : '');

const comoObjeto = (body: unknown): Record<string, unknown> | null =>
    typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : null;

export const validarRegistro = (body: unknown): Resultado<RegistroInput> => {
    const datos = comoObjeto(body);
    if (!datos) return { ok: false, errores: ['Debes enviar los datos en formato JSON'] };

    const errores: string[] = [];

    const nombre = texto(datos.nombre);
    if (nombre.length < 2 || nombre.length > 60) {
        errores.push('El nombre es obligatorio (entre 2 y 60 caracteres)');
    }

    const email = texto(datos.email).toLowerCase();
    if (!EMAIL.test(email) || email.length > 120) {
        errores.push('Escribe un correo electrónico válido');
    }

    const password = typeof datos.password === 'string' ? datos.password : '';
    if (password.length < 8 || password.length > 72 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        errores.push('La contraseña debe tener entre 8 y 72 caracteres, con al menos una letra y un número');
    }

    if (errores.length > 0) return { ok: false, errores };
    return { ok: true, datos: { nombre, email, password } };
};

export const validarLogin = (body: unknown): Resultado<LoginInput> => {
    const datos = comoObjeto(body);
    if (!datos) return { ok: false, errores: ['Debes enviar los datos en formato JSON'] };

    const email = texto(datos.email).toLowerCase();
    const password = typeof datos.password === 'string' ? datos.password : '';

    const errores: string[] = [];
    if (!EMAIL.test(email)) errores.push('Escribe un correo electrónico válido');
    if (password.length === 0) errores.push('La contraseña es obligatoria');

    if (errores.length > 0) return { ok: false, errores };
    return { ok: true, datos: { email, password } };
};
