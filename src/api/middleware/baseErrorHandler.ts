import { BaseError, ServerError } from '../../core/errors';
import { Request, Response, NextFunction } from 'express';
import logger from '../../core/logger';

export default function baseErrorHandler(
  error: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let errorResponse: any = {};

  if (error.errors && !res.headersSent) {
    errorResponse = {
      message: error.message,
      status: error.status,
      errors: error.errors,
    };
  } else if (error && error.name === 'SequelizeValidationError') {
    errorResponse.status = 422;
    errorResponse.message = 'SQL validation error';
    errorResponse.errors = error.errors.map((err) => {
      return {
        message: err.message,
        attribute: err.path,
        value: err.value,
        type: err.type,
      };
    });
  } else if (error && error.name === 'SequelizeUniqueConstraintError') {
    errorResponse = {
      status: 422,
      message: error.errors[0].message,
      attribute: error.errors[0].path,
      value: error.errors[0].value,
      type: error.errors[0].type,
    };
  } else if (error && error.name === 'SequelizeForeignKeyConstratintError') {
    errorResponse = {
      status: 422,
      message: error.errors[0].message,
      attribute: error.errors[0].path,
      value: error.errors[0].value,
      type: error.errors[0].type,
    };
  } else {
    errorResponse = new ServerError();
  }

  if(process.env.NODE_ENV !== 'test'){
    logger.error(error);
  }
  res.status(errorResponse.status).json(errorResponse);
}
