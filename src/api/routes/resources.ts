import { Application } from 'express';
import { CreateResourceDto } from '../../core/dto';
import { ResourceController } from '../controllers';
import { validateReqMiddleware } from '../middleware';
import { validateAccessToken } from '../middleware';

function resourcesRoutes(app: Application) {
  app.get(
    '/api/v1/resource',
    validateAccessToken({ scope: ['resource:read'] }),
    ResourceController.getAllResources
  );

  app.get(
    '/api/v1/resource/:id',
    validateAccessToken({ scope: ['resource:write', 'resource:read'] }),
    ResourceController.getResourceById
  );

  app.post(
    '/api/v1/resource',
    validateAccessToken({ scope: ['resource:write'] }),
    validateReqMiddleware(CreateResourceDto),
    ResourceController.createResource
  );

  app.patch(
    '/api/v1/resource/:id',
    validateAccessToken({ scope: ['resource:write'] }),
    ResourceController.updateResource
  );
}

export default resourcesRoutes;
