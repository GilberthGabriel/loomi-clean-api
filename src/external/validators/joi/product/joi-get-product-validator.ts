import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiGetProductValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        query: Joi.object({
          id: Joi.string(),
          code: Joi.string(),
        }).min(1),
      }),
    );
  }
}
