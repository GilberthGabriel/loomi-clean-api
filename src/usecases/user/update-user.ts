import { EntityNotFoundError } from '../../entities/errors';
import { User, UpdateUserProps } from '../../entities/user';
import { UseCase, UserRepository } from '../ports';

export class UpdateUser implements UseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async perform(data: UpdateUserProps): Promise<User | EntityNotFoundError> {
    return this.userRepo.update(data);
  }
}
