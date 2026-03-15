import { Router } from 'express';
import { isAuthenticated } from '@/middlewares/auth0.ts';
import { connectIntegration, getConnectedIntegrations, getSupportedIntegrations, googleCallback, revokeIntegration } from './integrations.controllers.ts';

const integrationRouter = Router();

integrationRouter.get('/', isAuthenticated, getConnectedIntegrations)
integrationRouter.get('/supported', isAuthenticated, getSupportedIntegrations)
integrationRouter.post('/:provider/connect', isAuthenticated, connectIntegration)
integrationRouter.get('/:provider/callback', isAuthenticated, googleCallback)
integrationRouter.delete('/:provider/revoke', isAuthenticated, revokeIntegration)

export default integrationRouter;