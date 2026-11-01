import { Router } from 'express';
import { iniciarSesion, perfil, registrar } from '../controllers/authController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/registro', registrar);               
router.post('/login', iniciarSesion);              
router.get('/perfil', verificarToken, perfil);     

export default router;
