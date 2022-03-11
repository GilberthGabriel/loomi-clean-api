import { EntityNotFoundError } from '../../entities/errors';
import { UseCase, UserRepository } from '../ports';

export class DeleteUser implements UseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async perform(userId: string): Promise<boolean | EntityNotFoundError> {
    return this.userRepo.delete(userId);
  }
}
