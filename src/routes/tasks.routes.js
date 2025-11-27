// src/routes/tasks.routes.js
import express from 'express';
import {verifyToken} from '../middlewares/jwt.middleware.js';

const router = express.Router();

// Aplica el middleware a todas las rutas de este router
// router.use(verifyToken);

import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/tasks.controller.js';

router.use(verifyToken);


router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;




