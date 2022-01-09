import { Application } from 'express';
import { CreateUserDto, UserLoginDto } from '../../core/dto';
import { UserController } from '../controllers';
import { validateReqMiddleware } from '../middleware';

function userRoutes(app: Application) {
  const userController = UserController();

  app.post(
    '/api/v1/auth/register',
    validateReqMiddleware(CreateUserDto),
    userController.createUser
  );

  app.post(
    '/api/v1/auth/login',
    validateReqMiddleware(UserLoginDto),
    userController.login
  );

  app.post('/api/v1/auth/access_token', userController.getAccessToken);
}

export default userRoutes;
