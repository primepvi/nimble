import type { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/middlewares/verify-jwt';
import { GithubAuthenticator } from '@/services';
import { bindHandler } from '@/utils/bind-handler';
import { CreateApplicationController } from './create-application';
import { CreateDeployController } from './create-deploy';
import { FetchApplicationsController } from './fetch-applications';
import { GetApplicationController } from './get-application';
import { MeProfileController } from './profile';

export async function MeRoutes(app: FastifyInstance) {
  const profileController = new MeProfileController();

  app.addHook('onRequest', verifyJwt);
  app.get('/me', bindHandler(profileController));

  // Applications
  const createApplicationController = new CreateApplicationController(
    GithubAuthenticator
  );
  const getApplicationController = new GetApplicationController();
  const createDeployController = new CreateDeployController();
  const fetchApplicationsController = new FetchApplicationsController();

  app.post('/me/apps', bindHandler(createApplicationController));
  app.get('/me/apps', bindHandler(fetchApplicationsController));
  app.get('/me/apps/:slug', bindHandler(getApplicationController));
  app.post('/me/apps/:slug/deploy', bindHandler(createDeployController));
}
