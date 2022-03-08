import { UseCase, UserRepository } from '../ports';

export class DeleteUser implements UseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async perform(userId: string): Promise<boolean> {
    return this.userRepo.delete(userId);
  }
}
