import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiUpdateCustomerValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        body: Joi.object({
          name: Joi.string(),
          email: Joi.string().email(),
          phone: Joi.string().regex(/^\d+$/).message('phone must have only numbers'),
          address: Joi.string(),
          password: Joi.string().min(5),
        }).min(1),
      }),
    );
  }
}
