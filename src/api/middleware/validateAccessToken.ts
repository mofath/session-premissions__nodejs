import { JWT } from '../../core/utils/jwt';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../core/errors';

function accessTokenAuthValidate({ scope }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = JWT.verifyAccessToken(req);

      // skip admin from checking scope
      if (
        decoded.audience !== 'admin' &&
        decoded.scope.includes(scope) !== false
      ) {
        throw new UnauthorizedError(
          `Requested resource premission out of user scope`
        );
      }

      req.user = {
        id: decoded.user_id,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default accessTokenAuthValidate;
