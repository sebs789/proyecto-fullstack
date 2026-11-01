import dotenv from 'dotenv';

dotenv.config();

const requerida = (nombre: string): string => {
    const valor = process.env[nombre];
    if (!valor) {
        throw new Error(`Falta la variable de entorno ${nombre}. Copia .env.example como .env y complétala.`);
    }
    return valor;
};

export const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    mongoUri: requerida('MONGODB_URI'),
    jwtSecret: requerida('JWT_SECRET'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '2h',
    clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
};
