import { Express, Router } from 'express';
import customerRoutes from '../routes/customer-routes';
import orderRoutes from '../routes/order-routes';
import productRoutes from '../routes/product-routes';
import userRoutes from '../routes/user-routes';

export default (app: Express): void => {
  const apiRouter = Router();
  apiRouter.use('/users', userRoutes(Router()));
  apiRouter.use('/customers', customerRoutes(Router()));
  apiRouter.use('/products', productRoutes(Router()));
  apiRouter.use('/orders', orderRoutes(Router()));
  app.use('/api', apiRouter);
};
