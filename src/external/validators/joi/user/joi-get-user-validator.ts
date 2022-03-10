import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiGetUserValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        query: Joi.object({
          id: Joi.string(),
          email: Joi.string().email(),
        }).min(1),
      }),
    );
  }
}
