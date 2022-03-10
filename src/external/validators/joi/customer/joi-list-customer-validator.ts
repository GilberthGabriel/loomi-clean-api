import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiListCustomerValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        query: Joi.object({
          skip: Joi.number(),
          limit: Joi.number(),
        }),
      }),
    );
  }
}
