import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../config/dependencies/dependencies';

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "VLFs5cFKepvUA8uwIZ51Z3P2B1QNYGEv8YoYAXd9TUY=",
}, async (payload, done) => {
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) return done(null, false);
  done(null, user);
}));

export const passportMiddleware = passport.authenticate('jwt', { session: false });
