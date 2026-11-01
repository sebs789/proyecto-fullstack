import { Router } from 'express';
import {
    actualizarPlato,
    crearPlato,
    eliminarPlato,
    listarMisPlatos,
    listarPlatos,
} from '../controllers/platosController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', listarPlatos);                              
router.get('/mios', verificarToken, listarMisPlatos);       
router.post('/', verificarToken, crearPlato);              
router.put('/:id', verificarToken, actualizarPlato);        
router.delete('/:id', verificarToken, eliminarPlato);       

export default router;
