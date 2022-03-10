import Joi from 'joi';
import { HttpRequest, Validator, ValidatorResult } from '../../../presentation/controllers/ports';

export class JoiValidator implements Validator {
  private readonly scheme: Joi.Schema;

  constructor(scheme: Joi.Schema) {
    this.scheme = scheme;
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
