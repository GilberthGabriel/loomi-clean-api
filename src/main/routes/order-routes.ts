import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
  makeAddOrderController,
  makeDeleteOrderController,
  makeGetOrderController,
  makeListOrderController,
} from '../factories/controllers/order';

export default (router: Router): Router => {
  router.post('/', adaptRoute(makeAddOrderController()));
  router.get('/', adaptRoute(makeGetOrderController()));
  router.delete('/:id', adaptRoute(makeDeleteOrderController()));
  router.get('/all', adaptRoute(makeListOrderController()));
  return router;
};
