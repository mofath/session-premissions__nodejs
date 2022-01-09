import { Application } from 'express';
import coreRoutes from './core';
import userRoutes from './auth';
import resourcesRoutes from './resources';

function setupRoutes(app: Application) {
  coreRoutes(app);
  userRoutes(app);
  resourcesRoutes(app);
}

export default setupRoutes;
