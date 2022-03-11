import { EntityNotFoundError } from '../../entities/errors';
import { GetUserProps, VisibleUser } from '../../entities/user';
import { UseCase, UserRepository } from '../ports';

export class GetUser implements UseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async perform(data: GetUserProps): Promise<VisibleUser | EntityNotFoundError> {
    return this.userRepo.getVisible(data);
  }
}
