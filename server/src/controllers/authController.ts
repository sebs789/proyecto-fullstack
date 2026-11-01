import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { config } from '../config/env';
import { Usuario } from '../models/Usuario';
import { validarLogin, validarRegistro } from '../validators/authValidator';


const HASH_FALSO = bcrypt.hashSync('contraseña-falsa', 10);


const publico = (usuario: { _id: unknown; nombre: string; email: string }) => ({
    id: String(usuario._id),
    nombre: usuario.nombre,
    email: usuario.email,
});

export const registrar = async (req: Request, res: Response) => {
    const resultado = validarRegistro(req.body);
    if (!resultado.ok) {
        return res.status(400).json({ success: false, error: 'Datos inválidos', errores: resultado.errores });
    }
    const { nombre, email, password } = resultado.datos;

    if (await Usuario.exists({ email })) {
        return res.status(409).json({ success: false, error: 'Ya existe una cuenta con ese correo' });
    }

   
    const passwordHash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, passwordHash });

    res.status(201).json({ success: true, data: { usuario: publico(usuario) } });
};

export const iniciarSesion = async (req: Request, res: Response) => {
    const resultado = validarLogin(req.body);
    if (!resultado.ok) {
        return res.status(400).json({ success: false, error: 'Datos inválidos', errores: resultado.errores });
    }
    const { email, password } = resultado.datos;

    const usuario = await Usuario.findOne({ email }).select('+passwordHash');
    const valido = await bcrypt.compare(password, usuario ? usuario.passwordHash : HASH_FALSO);

    if (!usuario || !valido) {
        return res.status(401).json({ success: false, error: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: String(usuario._id) }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn as SignOptions['expiresIn'],
    });

    res.json({ success: true, data: { token, usuario: publico(usuario) } });
};


export const perfil = async (_req: Request, res: Response) => {
    const usuario = await Usuario.findById(res.locals.usuarioId);
    if (!usuario) {
        return res.status(401).json({ success: false, error: 'El usuario del token ya no existe' });
    }
    res.json({ success: true, data: { usuario: publico(usuario) } });
};
