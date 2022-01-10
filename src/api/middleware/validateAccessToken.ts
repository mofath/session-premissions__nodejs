import { JWT } from '../../core/utils/jwt';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../core/errors';

function accessTokenAuthValidate({ scope }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = JWT.verifyAccessToken(req);
      
      if(decoded.user_agent !== req.get('user-agent')) {
        throw new UnauthorizedError('Unauthorized')
      }

      const hasTheRightScope = scope.some(
        (s: string) => decoded.scope.indexOf(s) >= 0
      );

      if (!hasTheRightScope) {
        throw new UnauthorizedError(`Doesn't have scope required`);
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
