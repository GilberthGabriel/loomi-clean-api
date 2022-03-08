import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
  makeAddUserController, makeGetUserController, makeListUserController, makeUpdateController,
} from '../factories/controllers/user';

export default (router: Router): Router => {
  router.post('/', adaptRoute(makeAddUserController()));
  router.get('/', adaptRoute(makeGetUserController()));
  router.put('/:id', adaptRoute(makeUpdateController()));
  router.get('/all', adaptRoute(makeListUserController()));
  return router;
};
