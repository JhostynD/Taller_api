const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const taskRoutes = require('./routes/tasks.routes.js');
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
