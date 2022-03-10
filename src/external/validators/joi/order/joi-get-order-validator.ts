import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiGetOrderValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        query: Joi.object({
          id: Joi.string().required(),
        }),
      }),
    );
  }
}
