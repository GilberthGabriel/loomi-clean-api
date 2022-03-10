import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiGetCustomerValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        query: Joi.object({
          id: Joi.string(),
          email: Joi.string().email(),
          phone: Joi.string().regex(/^\d+$/).message('phone must have only numbers'),
        }).min(1),
      }),
    );
  }
}
