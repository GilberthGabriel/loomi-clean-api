import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiUpdateProductValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        body: Joi.object({
          name: Joi.string().min(3),
          price: Joi.number().greater(0),
          code: Joi.string().min(1),
          description: Joi.string(),
        }).min(1),
      }),
    );
  }
}
