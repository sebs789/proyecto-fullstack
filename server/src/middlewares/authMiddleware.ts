import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';


export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    const cabecera = req.headers.authorization;

    if (!cabecera || !cabecera.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Falta el token de acceso (Authorization: Bearer <token>)',
        });
    }

    const token = cabecera.slice('Bearer '.length).trim();

    try {
        const payload = jwt.verify(token, config.jwtSecret);
        if (typeof payload === 'string' || typeof payload.id !== 'string') {
            throw new Error('Token con formato inesperado');
        }
        res.locals.usuarioId = payload.id;
        next();
    } catch {
        res.status(401).json({ success: false, error: 'Token inválido o vencido' });
    }
};
