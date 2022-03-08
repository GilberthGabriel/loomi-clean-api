import { User, UpdateUserProps } from '../../entities/user';
import { UseCase, UserRepository } from '../ports';

export class UpdateUser implements UseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async perform(data: UpdateUserProps): Promise<User> {
    return this.userRepo.update(data);
  }
}
