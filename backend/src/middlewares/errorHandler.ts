import { Request, Response, NextFunction } from 'express';
import Log from '../models/Log';

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  try {
    await Log.create({ message: err.message, stack: err.stack, route: req.originalUrl });
  } catch (e) {
    console.error('Failed to write log', e);
  }
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
};
