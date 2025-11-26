// src/middlewares/jwt.middleware.js

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    // Leer encabezado: Authorization: Bearer TOKEN
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Acceso denegado. No se proporcionó un token.'
      });
    }

    // Separar "Bearer" del token real
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Token inválido o vacío.'
      });
    }

    // Verificar token usando la clave secreta del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar info del usuario en req.user
    req.user = decoded;   // contiene { id, email, iat, exp }

    next(); // continuar al controlador
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido o expirado.'
    });
  }
};
