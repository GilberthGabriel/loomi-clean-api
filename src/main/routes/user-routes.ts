import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeAddUserController, makeGetUserController, makeListUserController } from '../factories/controllers/user';

export default (router: Router): Router => {
  router.post('/', adaptRoute(makeAddUserController()));
  router.get('/', adaptRoute(makeGetUserController()));
  router.get('/all', adaptRoute(makeListUserController()));
  return router;
};
