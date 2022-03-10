import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiAddOrderValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        body: Joi.object({
          customerId: Joi.string().required(),
          productIds: Joi.array().items(Joi.string()).required(),
        }).required(),
      }),
    );
  }
}
