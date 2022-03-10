import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiListOrderValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        query: Joi.object({
          skip: Joi.number(),
          limit: Joi.number(),
          date: Joi.object({
            gte: Joi.date(),
            gt: Joi.date(),
            lte: Joi.date(),
            lt: Joi.date(),
            eq: Joi.date(),
          }),
        }),
      }),
    );
  }
}
