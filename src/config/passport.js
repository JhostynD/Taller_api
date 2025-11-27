// src/config/passport.js
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../prismaClient.js'; // ajusta si el nombre es diferente

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lee Authorization: Bearer xxx
  secretOrKey: process.env.JWT_SECRET,                      // misma clave que usas al firmar
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      // aquí asumo que en el token guardas el id del usuario como payload.id
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user) return done(null, false); // no encontrado → 401
      return done(null, user);             // se adjunta en req.user
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
