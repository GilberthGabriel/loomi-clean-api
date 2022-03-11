import { NextFunction, Request, Response } from 'express';
import { Middleware } from '../../presentation/middlewares/ports';

export const adaptMiddleware = (middleware: Middleware) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const httpResponse = await middleware.handle(req);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      return next();
    }

    res.status(httpResponse.statusCode).json(httpResponse.body);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'internal server error' });
  }
};
