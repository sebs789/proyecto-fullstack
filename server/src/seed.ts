import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { conectarBaseDeDatos } from './config/database';
import { Plato } from './models/Plato';
import { Usuario } from './models/Usuario';
import type { PlatoInput } from './types/plato';

const USUARIO_DEMO = {
    nombre: 'Usuario Demo',
    email: 'demo@restaurante.com',
    password: 'Demo1234',
};

const PLATOS: PlatoInput[] = [
    {"nombre": "Ceviche clásico", "categoria": "Entradas", "descripcion": "Pesca del día en leche de tigre con limón, ají limo, camote glaseado y choclo desgranado.", "precio": 38.0, "tiempo_preparacion": 15, "imagen": "/Eventos/cevichito.jpg"},
    {"nombre": "Causa limeña de pollo", "categoria": "Entradas", "descripcion": "Papa amarilla prensada con ají amarillo, rellena de pollo deshilachado, palta y mayonesa casera.", "precio": 24.0, "tiempo_preparacion": 10, "imagen": "/Eventos/causa3.jpg"},
    {"nombre": "Tiradito de lenguado", "categoria": "Entradas", "descripcion": "Láminas finas de lenguado con crema de ají amarillo, cebolla china y crocante de quinua.", "precio": 42.0, "tiempo_preparacion": 12, "imagen": "/Eventos/tiraditoleng.jpg"},
    {"nombre": "Anticuchos de corazón", "categoria": "Entradas", "descripcion": "Brochetas marinadas en ají panca, doradas a la parrilla con papa dorada y salsa de rocoto.", "precio": 28.0, "tiempo_preparacion": 20, "imagen": "/Eventos/anticuchito.jpg"},
    {"nombre": "Lomo saltado", "categoria": "Fondos", "descripcion": "Lomo fino salteado al wok con cebolla, tomate y sillao, servido con papas fritas y arroz graneado.", "precio": 45.0, "tiempo_preparacion": 25, "imagen": "/Eventos/lomo.jpg"},
    {"nombre": "Ají de gallina", "categoria": "Fondos", "descripcion": "Pechuga deshilachada en crema de ají amarillo y pan, con papa sancochada, aceituna y huevo.", "precio": 34.0, "tiempo_preparacion": 20, "imagen": "/Eventos/ajidegallina.jpg"},
    {"nombre": "Arroz con mariscos", "categoria": "Fondos", "descripcion": "Arroz meloso al culantro con calamar, pulpo, conchas de abanico y langostinos.", "precio": 52.0, "tiempo_preparacion": 30, "imagen": "/Eventos/mariscos.jpg"},
    {"nombre": "Seco de cordero", "categoria": "Fondos", "descripcion": "Cordero cocido lento en salsa de culantro y chicha, con frejoles canario y arroz blanco.", "precio": 48.0, "tiempo_preparacion": 35, "imagen": "/Eventos/secodecord.jpg"},
    {"nombre": "Suspiro a la limeña", "categoria": "Postres", "descripcion": "Manjar blanco sedoso coronado con merengue al oporto y una pizca de canela.", "precio": 18.0, "tiempo_preparacion": 8, "imagen": "/Eventos/suspiro.jpg"},
    {"nombre": "Picarones con miel de chancaca", "categoria": "Postres", "descripcion": "Buñuelos de zapallo y camote fritos al momento, bañados en miel especiada de chancaca.", "precio": 16.0, "tiempo_preparacion": 15, "imagen": "/Eventos/picarons.jpg"},
    {"nombre": "Chicha morada", "categoria": "Bebidas", "descripcion": "Maíz morado hervido con piña, canela y clavo de olor, servida bien fría.", "precio": 12.0, "tiempo_preparacion": 3, "imagen": "/Eventos/chichamor.jpg"},
    {"nombre": "Pisco sour", "categoria": "Bebidas", "descripcion": "Pisco quebranta, limón, jarabe de goma, clara de huevo y gotas de amargo de angostura.", "precio": 26.0, "tiempo_preparacion": 5, "imagen": "/Eventos/piscoss.jpg"},
];

const cargarDatos = async () => {
    await conectarBaseDeDatos();

    let usuario = await Usuario.findOne({ email: USUARIO_DEMO.email });
    if (!usuario) {
        const passwordHash = await bcrypt.hash(USUARIO_DEMO.password, 10);
        usuario = await Usuario.create({
            nombre: USUARIO_DEMO.nombre,
            email: USUARIO_DEMO.email,
            passwordHash,
        });
    }

    await Plato.deleteMany({ usuario: usuario._id });
    await Plato.insertMany(PLATOS.map((plato) => ({ ...plato, usuario: usuario._id })));

    console.log(`Datos de prueba cargados: ${PLATOS.length} platos.`);
    console.log(`Usuario demo -> correo: ${USUARIO_DEMO.email}  contraseña: ${USUARIO_DEMO.password}`);
};

cargarDatos()
    .catch((error) => {
        console.error('No se pudieron cargar los datos de prueba:', error);
        process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
