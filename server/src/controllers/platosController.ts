import type { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Plato } from '../models/Plato';
import { validarPlato } from '../validators/platoValidator';

const idInvalido = (res: Response) =>
    res.status(400).json({ success: false, error: 'El id no es válido' });

const noEncontrado = (res: Response) =>
    res.status(404).json({ success: false, error: 'Plato no encontrado' });

const sinPermiso = (res: Response) =>
    res.status(403).json({ success: false, error: 'No tienes permiso para modificar este plato' });




export const listarPlatos = async (_req: Request, res: Response) => {
    res.json({ success: true, data: await Plato.find().sort({ createdAt: 1 }) });
};


export const listarMisPlatos = async (_req: Request, res: Response) => {
    const platos = await Plato.find({ usuario: res.locals.usuarioId }).sort({ createdAt: 1 });
    res.json({ success: true, data: platos });
};

export const crearPlato = async (req: Request, res: Response) => {
    const resultado = validarPlato(req.body);
    if (!resultado.ok) {
        return res.status(400).json({ success: false, error: 'Datos inválidos', errores: resultado.errores });
    }

   
    const plato = await Plato.create({ ...resultado.datos, usuario: res.locals.usuarioId });
    res.status(201).json({ success: true, data: plato });
};

export const actualizarPlato = async (req: Request, res: Response) => {
    if (!isValidObjectId(req.params.id)) return idInvalido(res);

    const resultado = validarPlato(req.body);
    if (!resultado.ok) {
        return res.status(400).json({ success: false, error: 'Datos inválidos', errores: resultado.errores });
    }

    const plato = await Plato.findById(req.params.id);
    if (!plato) return noEncontrado(res);
    if (String(plato.usuario) !== res.locals.usuarioId) return sinPermiso(res);

    plato.set(resultado.datos);
    await plato.save();
    res.json({ success: true, data: plato });
};

export const eliminarPlato = async (req: Request, res: Response) => {
    if (!isValidObjectId(req.params.id)) return idInvalido(res);

    const plato = await Plato.findById(req.params.id);
    if (!plato) return noEncontrado(res);
    if (String(plato.usuario) !== res.locals.usuarioId) return sinPermiso(res);

    await plato.deleteOne();
    res.json({ success: true, message: 'Plato eliminado correctamente' });
};
