import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../presentation/controllers/ports';

export const adaptRoute = (controller: Controller) => async (
  req: Request,
  res: Response,
) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    headers: req.headers,
    params: req.params,
    query: req.query,
  };

  try {
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'internal server error' });
  }
};
