import { Request, Response } from 'express';
import { Controller } from '../../presentation/controllers/ports';

export const adaptRoute = (controller: Controller) => async (
  req: Request,
  res: Response,
) => {
  try {
    const httpResponse = await controller.handle(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'internal server error' });
  }
};
