import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
  makeAddProductController,
  makeDeleteProductController,
  makeGetProductController,
  makeListProductController,
  makeUpdateProductController,
} from '../factories/controllers/Product';

export default (router: Router): Router => {
  router.post('/', adaptRoute(makeAddProductController()));
  router.get('/', adaptRoute(makeGetProductController()));
  router.put('/:id', adaptRoute(makeUpdateProductController()));
  router.delete('/:id', adaptRoute(makeDeleteProductController()));
  router.get('/all', adaptRoute(makeListProductController()));
  return router;
};
