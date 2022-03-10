import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeLoginUserController } from '../factories/controllers/login';

export default (router: Router): Router => {
  router.post('/user', adaptRoute(makeLoginUserController()));
  return router;
};
