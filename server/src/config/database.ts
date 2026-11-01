import mongoose from 'mongoose';
import { config } from './env';

export const conectarBaseDeDatos = async (): Promise<void> => {
    await mongoose.connect(config.mongoUri);
    console.log('Conectado exitosamente a MongoDB');
};
