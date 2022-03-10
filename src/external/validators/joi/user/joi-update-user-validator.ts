import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiUpdateUserValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        body: Joi.object({
          email: Joi.string().email(),
          password: Joi.string().min(5),
        }).min(1),
      }),
    );
  }
}
