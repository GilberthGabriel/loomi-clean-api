import { EntityDuplicatedError } from '../../entities/errors';
import { AddUserProps } from '../../entities/user';
import { UseCase, UserRepository } from '../ports';

export class AddUser implements UseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async perform(data: AddUserProps): Promise<void | EntityDuplicatedError> {
    return this.userRepo.add({
      email: data.email,
      password: data.password,
    });
  }
}
