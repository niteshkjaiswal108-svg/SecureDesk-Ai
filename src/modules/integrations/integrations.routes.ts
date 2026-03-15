import { Router } from 'express';
import { isAuthenticated } from '@/middlewares/auth0.ts';
import { connectIntegration, getConnectedIntegrations, getSupportedIntegrations, integrationCallback, revokeIntegration } from './integrations.controllers.ts';

const integrationRouter = Router();

integrationRouter.get('/', isAuthenticated, getConnectedIntegrations)
integrationRouter.get('/supported', isAuthenticated, getSupportedIntegrations)
integrationRouter.post('/:provider/connect', isAuthenticated, connectIntegration)
integrationRouter.get('/:provider/callback', isAuthenticated, integrationCallback)
integrationRouter.delete('/:provider/revoke', isAuthenticated, revokeIntegration)

export default integrationRouter;