// src/config/passport.js
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import prisma from '../prismaClient.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lee el token del header
  secretOrKey: process.env.JWT_SECRET,                      // Clave usada para firmar el JWT
};

export default function initializePassport(passport) {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        // 👇 Aquí está el cambio IMPORTANTE
        // Login genera token así: { sub: user.id }
        // entonces aquí también se usa payload.sub
        const user = await prisma.user.findUnique({
          where: { id: payload.sub }
        });

        if (!user) return done(null, false);

        return done(null, user);   // El usuario queda en req.user
      } catch (err) {
        return done(err, false);
      }
    })
  );
}