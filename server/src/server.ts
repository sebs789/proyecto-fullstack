import { app } from './app';
import { conectarBaseDeDatos } from './config/database';
import { config } from './config/env';

const iniciar = async () => {
    try {
        await conectarBaseDeDatos();

        app.listen(config.port, () => {
            console.log(`Servidor ejecutándose en el puerto: ${config.port}`);
        });
    } catch (error) {
        console.error('Error crítico al arrancar la aplicación:', error);
        process.exit(1);
    }
};

iniciar();
