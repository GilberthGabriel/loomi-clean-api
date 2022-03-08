import { Express, Router } from 'express';
import customerRoutes from '../routes/customer-routes';
import userRoutes from '../routes/user-routes';

export default (app: Express): void => {
  const apiRouter = Router();
  apiRouter.use('/users', userRoutes(Router()));
  apiRouter.use('/customers', customerRoutes(Router()));
  app.use('/api', apiRouter);
};
