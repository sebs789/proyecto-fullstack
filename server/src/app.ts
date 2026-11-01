import cors from 'cors';
import express from 'express';
import type { Request, Response } from 'express';
import { config } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import platosRoutes from './routes/platosRoutes';

export const app = express();

// Solo el frontend indicado en CLIENT_URL puede llamar a la API desde el navegador
app.use(cors({ origin: config.clientUrl }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/platos', platosRoutes);

// Si ninguna ruta coincide
app.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, error: 'Ruta no encontrada' });
});

app.use(errorHandler);
