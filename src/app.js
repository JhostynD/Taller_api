import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';           // 👈 importar passport original
import initializePassport from './config/passport.js'; // 👈 importar la función que lo configura

import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 👇 Inicializar y configurar passport
initializePassport(passport);
app.use(passport.initialize());

// Rutas públicas
app.use('/auth', authRoutes);

// Rutas protegidas (solo si las quieres proteger aquí)
app.use(
  '/tasks',
  passport.authenticate('jwt', { session: false }),
  tasksRoutes
);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
