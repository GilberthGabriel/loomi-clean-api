import { Router } from 'express';
import { Role } from '../../entities';
import { adaptRoute } from '../adapters';
import { adaptMiddleware } from '../adapters/adapt-express-middleware';
import {
  makeAddCustomerController,
  makeDeleteCustomerController,
  makeGetCustomerController,
  makeListCustomerController,
  makeUpdateCustomerController,
} from '../factories/controllers/customer';
import { makeAuthMiddleware } from '../factories/middlewares/make-auth-middleware';

export default (router: Router): Router => {
  router.post('/', adaptRoute(makeAddCustomerController()));
  router.get('/', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetCustomerController()));
  router.put('/:id', adaptMiddleware(makeAuthMiddleware(Role.CUSTOMER)), adaptRoute(makeUpdateCustomerController()));
  router.delete('/:id', adaptMiddleware(makeAuthMiddleware(Role.CUSTOMER)), adaptRoute(makeDeleteCustomerController()));
  router.get('/all', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeListCustomerController()));
  return router;
};
