import { RequestHandler, Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationError as ValidationException } from '../../core/errors';

export default function validateReqMiddleware<T>(type: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const validationErrors = errors.map((error: ValidationError) => {
          // Only return the first error for each field
          const msg = Object.values(error.constraints || {})[0];

          return {
            field: error.property,
            message: msg,
          };
        });
        next(new ValidationException(validationErrors));
      } else {
        next();
      }
    });
  };
}
