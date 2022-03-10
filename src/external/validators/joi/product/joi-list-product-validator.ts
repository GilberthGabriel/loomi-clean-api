import Joi from 'joi';
import { HttpRequest, Validator, ValidatorResult } from '../../../../presentation/controllers/ports';

export class JoiListProductValidator implements Validator {
  private readonly scheme;

  constructor() {
    this.scheme = Joi.object({
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
      }),
    });
  }

  validate(request: HttpRequest): ValidatorResult {
    const response: ValidatorResult = {
      isValid: true,
      errors: [],
    };

    const result = this.scheme.validate(request, { allowUnknown: true });
    if (result.error) {
      response.isValid = false;
      response.errors = result.error?.details.map((detail) => detail.message);
    }

    return response;
  }
}
