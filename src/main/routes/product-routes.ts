import { Router } from 'express';
import { Role } from '../../entities';
import { adaptRoute } from '../adapters';
import { adaptMiddleware } from '../adapters/adapt-express-middleware';
import {
  makeAddProductController,
  makeDeleteProductController,
  makeGetProductController,
  makeListProductController,
  makeUpdateProductController,
} from '../factories/controllers/Product';
import { makeAuthMiddleware } from '../factories/middlewares/make-auth-middleware';

export default (router: Router): Router => {
  router.post('/', adaptMiddleware(makeAuthMiddleware(Role.ADMIN)), adaptRoute(makeAddProductController()));
  router.get('/', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetProductController()));
  router.put('/:id', adaptMiddleware(makeAuthMiddleware(Role.ADMIN)), adaptRoute(makeUpdateProductController()));
  router.delete('/:id', adaptMiddleware(makeAuthMiddleware(Role.ADMIN)), adaptRoute(makeDeleteProductController()));
  router.get('/all', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeListProductController()));
  return router;
};
