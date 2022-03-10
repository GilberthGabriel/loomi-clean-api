import { ApplicationError } from './aplication-error';

export class EntityDuplicatedError extends ApplicationError {
  constructor(public readonly key?: string) {
    super({
      code: 'E101',
      message: 'Entity key is already registered',
    });
  }
}
