import { GetUserProps, User } from '../../entities/user';
import { UseCase, UserRepository } from '../ports';

export class GetUser implements UseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async perform(data: GetUserProps): Promise<User> {
    return this.userRepo.get(data);
  }
}
