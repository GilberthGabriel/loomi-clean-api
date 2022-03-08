import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
  makeAddCustomerController,
  makeDeleteCustomerController,
  makeGetCustomerController,
  makeListCustomerController,
  makeUpdateCustomerController,
} from '../factories/controllers/customer';

export default (router: Router): Router => {
  router.post('/', adaptRoute(makeAddCustomerController()));
  router.get('/', adaptRoute(makeGetCustomerController()));
  router.put('/:id', adaptRoute(makeUpdateCustomerController()));
  router.delete('/:id', adaptRoute(makeDeleteCustomerController()));
  router.get('/all', adaptRoute(makeListCustomerController()));
  return router;
};
