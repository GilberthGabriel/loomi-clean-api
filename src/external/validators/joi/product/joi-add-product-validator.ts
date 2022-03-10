import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiAddProductValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        body: Joi.object({
          name: Joi.string().min(3).required(),
          price: Joi.number().greater(0).required(),
          code: Joi.string().min(1).required(),
          description: Joi.string(),
        }),
      }),
    );
  }
}
