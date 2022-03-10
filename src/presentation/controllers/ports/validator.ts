import { HttpRequest } from './http';

export interface ValidatorResult {
  isValid: boolean,
  errors: string[]
}

export interface Validator {
  validate(request: HttpRequest): ValidatorResult
}
