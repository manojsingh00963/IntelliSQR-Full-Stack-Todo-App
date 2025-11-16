import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // minimal logger (could be expanded to write to DB)
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};
