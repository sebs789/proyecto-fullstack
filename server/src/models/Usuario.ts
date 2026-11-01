import { Schema, model } from 'mongoose';

export interface IUsuario {
    nombre: string;
    email: string;
    passwordHash: string;
}

const usuarioSchema = new Schema<IUsuario>(
    {
        nombre: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true, select: false },
    },
    { timestamps: true },
);

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
