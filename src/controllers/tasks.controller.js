// src/controllers/tasks.controller.js
import prisma from '../prismaClient.js';

// GET /tasks - Obtiene SOLO las tareas del usuario autenticado
const getTasks = async (req, res) => {
  try {
     // ID obtenido del token
    console.log("---------");
    
    const tasks = await prisma.task.findMany()
    res.json(tasks);
  } catch (error) {
    console.error('GET /tasks error:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

// POST /tasks - Crea tarea asociada al usuario del token
const createTask = async (req, res) => {
  try {
    const userId = req.user.id; // ID del token
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'title is required' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: userId,
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('POST /tasks error:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

// PUT /tasks/:id - Solo modifica tareas del usuario dueño
const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (status && !['pending', 'done'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const task = await prisma.task.updateMany({
      where: { id: parseInt(id), userId },
      data: { title, description, status }
    });

    if (task.count === 0) {
      return res.status(404).json({ error: 'Task not found or not yours' });
    }

    res.json({ message: 'Task updated' });
  } catch (error) {
    console.error('PUT /tasks/:id error:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
};

// DELETE /tasks/:id - Solo permite borrar tareas del usuario dueño
const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const task = await prisma.task.deleteMany({
      where: { id: parseInt(id), userId }
    });

    if (task.count === 0) {
      return res.status(404).json({ error: 'Task not found or not yours' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('DELETE /tasks/:id error:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
};

export { getTasks, createTask, updateTask, deleteTask };
