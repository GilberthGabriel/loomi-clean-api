import { ApplicationError } from './aplication-error';

export class LoginFailureError extends ApplicationError {
  constructor() {
    super({
      code: 'L100',
      message: 'Invalid credentials',
    });
  }
}
