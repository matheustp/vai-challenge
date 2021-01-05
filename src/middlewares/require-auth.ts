import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers['x-api-key'] || req.headers['x-api-key'] !== process.env.API_KEY) {
    throw new NotAuthorizedError();
  }

  next();
};
