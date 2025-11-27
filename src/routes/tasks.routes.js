// src/routes/tasks.routes.js
import express from 'express';
import passport from '../config/passport.js';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks.controller.js';

const router = express.Router();

// Todas las rutas de /tasks requieren JWT con Passport
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', getTasks);        // GET /tasks
router.post('/', createTask);     // POST /tasks
router.put('/:id', updateTask);   // PUT /tasks/:id
router.delete('/:id', deleteTask);// DELETE /tasks/:id

export default router;
