import { EntityDuplicatedError, EntityNotFoundError } from '../../entities/errors';
import {
  AddUserProps, GetUserProps, User, ListUserProps, UpdateUserProps,
} from '../../entities/user';

export interface UserRepository {
  add(data: AddUserProps): Promise<void | EntityDuplicatedError>
  get(data: GetUserProps): Promise<User | EntityNotFoundError>
  list(data: ListUserProps): Promise<User[]>
  update(data: UpdateUserProps): Promise<User>
  delete(id: string): Promise<boolean>
}
