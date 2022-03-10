import { EntityNotFoundError } from '../../entities/errors';
import { VisibleUser, UpdateUserProps } from '../../entities/user';
import { PasswordAdapter, UseCase, UserRepository } from '../ports';

export class UpdateUser implements UseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordAdapter: PasswordAdapter,
  ) { }

  async perform(data: UpdateUserProps): Promise<VisibleUser | EntityNotFoundError> {
    if (data.password) {
      data.password = await this.passwordAdapter.hash(data.password, 10);
    }

    return this.userRepo.update(data);
  }
}
