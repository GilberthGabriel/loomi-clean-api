import { Router } from 'express';
import { Role } from '../../entities';
import { adaptRoute } from '../adapters';
import { adaptMiddleware } from '../adapters/adapt-express-middleware';
import {
  makeAddUserController,
  makeDeleteUserController,
  makeGetUserController,
  makeListUserController,
  makeUpdateUserController,
} from '../factories/controllers/user';
import { makeAuthMiddleware } from '../factories/middlewares/make-auth-middleware';

export default (router: Router): Router => {
  router.post('/', adaptRoute(makeAddUserController()));
  router.get('/', adaptMiddleware(makeAuthMiddleware(Role.ADMIN)), adaptRoute(makeGetUserController()));
  router.put('/:id', adaptMiddleware(makeAuthMiddleware(Role.ADMIN)), adaptRoute(makeUpdateUserController()));
  router.delete('/:id', adaptMiddleware(makeAuthMiddleware(Role.ADMIN)), adaptRoute(makeDeleteUserController()));
  router.get('/all', adaptMiddleware(makeAuthMiddleware(Role.ADMIN)), adaptRoute(makeListUserController()));
  return router;
};
