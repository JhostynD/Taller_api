const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validar que email y password existan
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }
    
    // Validar que el email no esté ya registrado
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Email already in use' 
      });
    }
    
    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Crear el usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });
    
    // Responder con éxito (sin devolver la contraseña)
    res.status(201).json({
      message: 'User registered successfully',
      user: { 
        id: user.id, 
        email: user.email 
      }
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Error registering user' 
    });
  }
};

module.exports = { register };
