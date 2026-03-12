import { Router } from 'express';
import { isAuthenticated } from '@/middlewares/auth0.ts';
import { connectIntegration, googleCallback } from './integrations.controllers.ts';

const integrationRouter = Router();

integrationRouter.post('/integrations/:provider/connect', isAuthenticated, connectIntegration)
integrationRouter.get('/integrations/:provider/callback', isAuthenticated, googleCallback)

export default integrationRouter;