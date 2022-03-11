import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { adaptMiddleware } from '../adapters/adapt-express-middleware';
import {
  makeAddOrderController,
  makeAddProductOnOrderController,
  makeDeleteOrderController,
  makeGetOrderController,
  makeListOrderController,
  makeRemoveProductOnOrderController,
} from '../factories/controllers/order';
import { makeAuthMiddleware } from '../factories/middlewares/make-auth-middleware';

export default (router: Router): Router => {
  router.post('/', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddOrderController()));
  router.get('/', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetOrderController()));
  router.put('/add-product/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddProductOnOrderController()));
  router.put('/remove-product/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeRemoveProductOnOrderController()));
  router.delete('/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteOrderController()));
  router.get('/all', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeListOrderController()));
  return router;
};
