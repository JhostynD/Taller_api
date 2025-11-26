import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from './routes/tasks.routes.js';
import express from "express";
import dotenv from 'dotenv'

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Puerto donde va a correr el servidor
const PORT = process.env.PORT || 3000;

// Middleware para que Express pueda leer JSON en el cuerpo de las peticiones
app.use(express.json());

// Rutas públicas y privadas
// Aquí solo se registran las rutas. La protección con JWT se hace dentro de cada router.
app.use('/auth', authRoutes);   // aquí entran login, register, refresh (todas públicas)
app.use('/tasks', tasksRoutes); // estas deberían requerir JWT (luego agregamos el middleware)

// Ruta básica para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
