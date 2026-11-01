import type { NextFunction, Request, Response } from 'express';

interface ErrorConDatos extends Error {
    statusCode?: number;
    code?: number;
}


export const errorHandler = (
    err: ErrorConDatos,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    console.error(`[Error] ${err.message}`);

    
    if (err.code === 11000) {
        return res.status(409).json({ success: false, error: 'Ese dato ya está registrado' });
    }

    
    if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Datos inválidos' });
    }

    
    const status = err.statusCode && err.statusCode < 500 ? err.statusCode : 500;
    res.status(status).json({
        success: false,
        error: status === 500
            ? 'Error interno del servidor'
            : 'La petición no es válida (revisa el JSON enviado)',
    });
};
