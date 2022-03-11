import { EntityDuplicatedError } from '../../entities/errors';
import { AddUserProps, VisibleUser } from '../../entities/user';
import { PasswordAdapter, UseCase, UserRepository } from '../ports';

export class AddUser implements UseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordAdapter: PasswordAdapter,
  ) { }

  async perform(data: AddUserProps): Promise<VisibleUser | EntityDuplicatedError> {
    const hashPassoword = await this.passwordAdapter.hash(data.password, 10);
    return this.userRepo.add({
      email: data.email,
      password: hashPassoword,
    });
  }
}
