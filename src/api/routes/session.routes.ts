import { Router } from 'express'
import SessionController from '../controllers/session.controller'

const router = Router({ mergeParams: true });
const sessionController = new SessionController();

// Rotas para sessões
router.post('/', sessionController.createSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession); 

export default router;

