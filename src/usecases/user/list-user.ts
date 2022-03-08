import { User } from '../../entities/user';
import { UseCase, UserRepository } from '../ports';

export class ListUser implements UseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async perform(): Promise<User[]> {
    return this.userRepo.list();
  }
}
