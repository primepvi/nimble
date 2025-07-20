import type { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/middlewares/verify-jwt';
import { bindHandler } from '@/utils/bind-handler';
import { MeProfileController } from './profile';

export async function MeRoutes(app: FastifyInstance) {
  const profileController = new MeProfileController();

  app.addHook('onRequest', verifyJwt);
  app.get('/me', bindHandler(profileController));
}
