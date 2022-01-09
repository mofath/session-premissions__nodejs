import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware';

 function CoreController() {
  async function ping(req: Request, res: Response, next: NextFunction) {
    res.json({ status: 200 });
  }

  return Object.freeze({
    ping: asyncHandler(ping), 
  });
};

export default CoreController;
