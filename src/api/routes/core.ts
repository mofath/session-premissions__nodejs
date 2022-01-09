import { Application } from 'express';
import { CoreController } from '../controllers';

function coreRoutes(app: Application) {
  const coreController = CoreController();
  
  app.get('/api/v1/ping', coreController.ping);
}

export default coreRoutes;
