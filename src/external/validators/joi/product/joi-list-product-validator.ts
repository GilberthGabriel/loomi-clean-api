import Joi from 'joi';
import { JoiValidator } from '../joi-validator';

export class JoiListProductValidator extends JoiValidator {
  constructor() {
    super(
      Joi.object({
        query: Joi.object({
          skip: Joi.number(),
          limit: Joi.number(),
          price: Joi.object({
            gte: Joi.number(),
            gt: Joi.number(),
            lte: Joi.number(),
            lt: Joi.number(),
            eq: Joi.number(),
          }),
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
