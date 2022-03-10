import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiAddUserValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        body: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(5).required(),
        }),
      }),
    );
  }
}
