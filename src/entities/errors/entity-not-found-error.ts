import { ApplicationError } from './aplication-error';

export class EntityNotFoundError extends ApplicationError {
  constructor() {
    super({
      code: 100,
      message: 'No entity was found',
    });
  }
}
