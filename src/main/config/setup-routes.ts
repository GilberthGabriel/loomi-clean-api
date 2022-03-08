import { Express, Router } from 'express';
import customerRoutes from '../routes/customer-routes';
import productRoutes from '../routes/product-routes';
import userRoutes from '../routes/user-routes';

export default (app: Express): void => {
  const apiRouter = Router();
  apiRouter.use('/users', userRoutes(Router()));
  apiRouter.use('/customers', customerRoutes(Router()));
  apiRouter.use('/products', productRoutes(Router()));
  app.use('/api', apiRouter);
};
