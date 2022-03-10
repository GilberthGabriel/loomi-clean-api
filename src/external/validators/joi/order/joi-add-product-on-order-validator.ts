import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiAddProductOnOrder extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        body: Joi.object({
          products: Joi.array().items(Joi.object({
            id: Joi.string().required(),
          })),
        }),
      }).required(),
    );
  }
}
