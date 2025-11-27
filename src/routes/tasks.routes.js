import { Router } from 'express';
import passport from 'passport';   // 👈 PASSPORT ORIGINAL
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/tasks.controller.js';

const router = Router();

// 🔐 Proteger TODAS las rutas de este archivo
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;