import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
  makeAddUserController,
  makeDeleteUserController,
  makeGetUserController,
  makeListUserController,
  makeUpdateUserController,
} from '../factories/controllers/user';

export default (router: Router): Router => {
  router.post('/', adaptRoute(makeAddUserController()));
  router.get('/', adaptRoute(makeGetUserController()));
  router.put('/:id', adaptRoute(makeUpdateUserController()));
  router.delete('/:id', adaptRoute(makeDeleteUserController()));
  router.get('/all', adaptRoute(makeListUserController()));
  return router;
};
