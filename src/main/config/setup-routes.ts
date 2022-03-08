import { Express, Router } from 'express';
import userRoutes from '../routes/user-routes';

export default (app: Express): void => {
  const apiRouter = Router();
  const userRouter = Router();
  apiRouter.use('/users', userRoutes(userRouter));
  app.use('/api', apiRouter);
};
