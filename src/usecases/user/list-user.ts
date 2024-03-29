import { ListUserProps, VisibleUser } from '../../entities';
import { UseCase, UserRepository } from '../ports';

export class ListUser implements UseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async perform(data: ListUserProps): Promise<VisibleUser[]> {
    return this.userRepo.list(data);
  }
}
