import type { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/middlewares/verify-jwt';
import { bindHandler } from '@/utils/bind-handler';
import { CreateApplicationController } from './create-application';
import { GetApplicationController } from './get-application';
import { MeProfileController } from './profile';

export async function MeRoutes(app: FastifyInstance) {
  const profileController = new MeProfileController();

  app.addHook('onRequest', verifyJwt);
  app.get('/me', bindHandler(profileController));

  // Applications
  const createApplicationController = new CreateApplicationController();
  const getApplicationController = new GetApplicationController();

  app.post('/me/apps', bindHandler(createApplicationController));
  app.get('/me/apps/:slug', bindHandler(getApplicationController));
}
