import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
  makeAddOrderController,
  makeAddProductOnOrderController,
  makeDeleteOrderController,
  makeGetOrderController,
  makeListOrderController,
  makeRemoveProductOnOrderController,
} from '../factories/controllers/order';

export default (router: Router): Router => {
  router.post('/', adaptRoute(makeAddOrderController()));
  router.get('/', adaptRoute(makeGetOrderController()));
  router.put('/add-product/:id', adaptRoute(makeAddProductOnOrderController()));
  router.put('/remove-product/:id', adaptRoute(makeRemoveProductOnOrderController()));
  router.delete('/:id', adaptRoute(makeDeleteOrderController()));
  router.get('/all', adaptRoute(makeListOrderController()));
  return router;
};
