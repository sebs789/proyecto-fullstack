import { Schema, Types, model } from 'mongoose';
import { CATEGORIAS, type Categoria } from '../types/plato';

export interface IPlato {
    nombre: string;
    categoria: Categoria;
    descripcion: string;
    precio: number;
    tiempo_preparacion: number;
    imagen: string;
    usuario: Types.ObjectId;
}

const platoSchema = new Schema<IPlato>(
    {
        nombre: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
        categoria: { type: String, required: true, enum: [...CATEGORIAS] },
        descripcion: { type: String, required: true, trim: true, minlength: 5, maxlength: 500 },
        precio: { type: Number, required: true, min: 0.01, max: 9999 },
        tiempo_preparacion: { type: Number, required: true, min: 1, max: 300 },
        imagen: { type: String, required: true, trim: true, maxlength: 255 },
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true, index: true },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,   
            versionKey: false,
            transform: (_doc, ret) => {
                delete (ret as Record<string, unknown>)._id;
                return ret;
            },
        },
    },
);

export const Plato = model<IPlato>('Plato', platoSchema);