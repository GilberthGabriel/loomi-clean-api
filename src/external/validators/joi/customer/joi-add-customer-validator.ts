import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiAddCustomerValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        body: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          phone: Joi.string().required().regex(/^\d+$/).message('phone must have only numbers'),
          address: Joi.string().required(),
          password: Joi.string().min(5).required(),
        }),
      }),
    );
  }
}
