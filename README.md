# MyRestaurant: aplicación web full stack

Aplicación web full stack para gestionar la carta de un restaurante. Permite **registrarse e iniciar sesión**  y, una vez dentro, **listar, crear, editar y eliminar platos** propios. Las operaciones pasan por una API REST y se guardan en MongoDB.

**Autor:** Andres Sebastian Landeo Mallma
**Repositorio:** https://github.com/sebs789/proyecto-fullstack

## Tecnologías

| Parte | Tecnologías |
|---|---|
| `client/` (frontend) | React 19, TypeScript, Vite, Tailwind CSS, React Router |
| `server/` (backend) | Node.js, Express 5, TypeScript, Mongoose |
| Base de datos | MongoDB (local o MongoDB Atlas) |
| Seguridad | bcryptjs (hash de contraseñas), jsonwebtoken (JWT), variables de entorno |

## Estructura del repositorio

```
├── client/                      Frontend: React + TypeScript
│   ├── public/                  imágenes de los platos
│   └── src/
│       ├── pages/               Home, Login, Registro y Admin ("Mis platos")
│       ├── components/          componentes reutilizables (formulario, tabla, tarjeta, mensajes...)
│       ├── context/             estado global de la sesión (AuthProvider)
│       ├── hooks/               useAuth y usePlatos
│       ├── services/            comunicación con la API
│       └── types/               interfaces de TypeScript
├── server/                      Backend: Node.js + Express + Mongoose
│   └── src/
│       ├── routes/              qué función atiende cada URL
│       ├── controllers/         lógica de cada operación
│       ├── models/              esquemas y modelos de Mongoose (Usuario, Plato)
│       ├── middlewares/         verificación del token JWT y manejo de errores
│       ├── validators/          validación de los datos recibidos
│       └── config/              variables de entorno y conexión a MongoDB
└── README.md
```

## Requisitos previos

- Node.js 20 o superior 
- Una base de datos MongoDB: local o en MongoDB Atlas 

## Instalación y ejecución

### 1. Configurar MongoDB


1. Crea una cuenta en <https://www.mongodb.com/atlas> y un cluster gratuito (M0).
2. En *Database Access*, crea un usuario con contraseña para la base de datos.
3. En *Network Access*, permite tu dirección IP 
4. En el cluster, pulsa *Connect > Drivers* y copia la cadena de conexión. Se parece a `mongodb+srv://USUARIO:CONTRASEÑA@cluster0.xxxxx.mongodb.net/`.

Los nombres exactos de los menús de Atlas pueden variar un poco con el tiempo.


### 2. Backend

```bash
cd server
npm install
```

 `.env` y completa los valores:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor  |
| `MONGODB_URI` | Cadena de conexión a MongoDB  |
| `JWT_SECRET` | Texto largo y aleatorio para firmar los tokens. |
| `JWT_EXPIRES_IN` | Duración del token |
| `CLIENT_URL` | Dirección del frontend, por defecto `http://localhost:5173` |

Carga los datos de prueba (un usuario demo y 12 platos):

```bash
npm run seed
```

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

Debes ver `Conectado exitosamente a MongoDB` y `Servidor ejecutándose en el puerto: 3000`.

Otros comandos: `npm run build` (compila a `dist/`) y `npm start` (ejecuta lo compilado).

### 3. Frontend

En otra terminal:

```bash
cd client
npm install
npm run dev
```

Abre <http://localhost:5173/>. El frontend usa por defecto el backend en `http://localhost:3000`

Otros comandos: `npm run build` y `npm run lint`.

## Datos de prueba

Al ejecutar `npm run seed` se crea este usuario, que ya tiene los 12 platos de la carta:

- **Correo:** `demo@restaurante.com`
- **Contraseña:** `Demo1234`

También puedes crear tu propia cuenta desde **Crear cuenta**: empezarás sin platos y podrás agregar los tuyos.

## Funcionalidades

- **Página pública:** portada, carta con filtros por categoría, horarios y contacto. Cualquier visitante ve todos los platos.
- **Registro:** nombre, correo y contraseña (mínimo 8 caracteres, con una letra y un número). La contraseña se guarda cifrada con bcrypt.
- **Inicio de sesión:** valida las credenciales y devuelve un token JWT. El token se envía en cada petición protegida como `Authorization: Bearer <token>`.
- **Mis platos (ruta protegida):** sin sesión, el sistema redirige al login. Con sesión permite:
  - **Listar** los platos del usuario, con conteos por categoría.
  - **Crear** un plato con un formulario controlado y validado.
  - **Editar** un plato.
  - **Eliminar** un plato, con confirmación previa.
- **Control de acceso:** cada plato pertenece al usuario que lo creó, y solo él puede editarlo o eliminarlo.
- **Mensajes** de éxito y de error, estados de carga y manejo de errores de conexión.

## API REST

Base: `http://localhost:3000`. Las respuestas son JSON con el formato `{ "success": true, "data": ... }` o `{ "success": false, "error": "..." }`.

| Método | Ruta | Acceso | Descripción | Códigos |
|---|---|---|---|---|
| POST | `/auth/registro` | Público | Crea una cuenta | 201, 400, 409 |
| POST | `/auth/login` | Público | Devuelve el token JWT y el usuario | 200, 400, 401 |
| GET | `/auth/perfil` | Con token | Datos del usuario del token | 200, 401 |
| GET | `/platos` | Público | Lista todos los platos (la carta) | 200 |
| GET | `/platos/mios` | Con token | Lista los platos del usuario | 200, 401 |
| POST | `/platos` | Con token | Crea un plato | 201, 400, 401 |
| PUT | `/platos/:id` | Con token | Edita un plato propio | 200, 400, 401, 403, 404 |
| DELETE | `/platos/:id` | Con token | Elimina un plato propio | 200, 400, 401, 403, 404 |

Código 500: error interno, sin revelar detalles. Código 403: el plato existe pero es de otro usuario.

## Seguridad

- Las contraseñas **nunca** se guardan en texto plano: se cifran con bcrypt (10 rondas) antes de guardarlas y no se devuelven en ninguna respuesta.
- Los tokens JWT se firman con `JWT_SECRET` y se verifican en el backend con un middleware antes de permitir el acceso a las rutas protegidas.
- El login responde igual si el correo no existe o la contraseña es incorrecta, para no revelar qué correos están registrados.
- Los secretos y la cadena de conexión están en el archivo `.env`, que no se sube al repositorio (está en `.gitignore`). Solo se incluye `.env.example`, con valores de ejemplo.
- El servidor ignora el dueño que venga en el cuerpo de una petición: siempre usa el del token.
- CORS permite solo la dirección del frontend (`CLIENT_URL`).
- El token se guarda en `localStorage` del navegador, lo habitual en proyectos académicos. En producción conviene usar cookies `httpOnly`.



