import { Router } from 'express';
import { isAuthenticated } from '@/middlewares/auth0.ts';
import { connectIntegration, getSupportedIntegrations, googleCallback } from './integrations.controllers.ts';

const integrationRouter = Router();

integrationRouter.get('/supported', isAuthenticated, getSupportedIntegrations)
integrationRouter.post('/:provider/connect', isAuthenticated, connectIntegration)
integrationRouter.get('/:provider/callback', isAuthenticated, googleCallback)

export default integrationRouter;