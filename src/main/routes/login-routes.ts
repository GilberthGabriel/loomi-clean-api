import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeLoginCustomerController, makeLoginUserController } from '../factories/controllers/login';

export default (router: Router): Router => {
  router.post('/user', adaptRoute(makeLoginUserController()));
  router.post('/customer', adaptRoute(makeLoginCustomerController()));
  return router;
};
