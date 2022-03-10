import { ApplicationError } from './aplication-error';

export class EntityNotFoundError extends ApplicationError {
  constructor() {
    super({
      code: 'E100',
      message: 'No entity was found',
    });
  }
}
