import { EntityDuplicatedError, EntityNotFoundError } from '../../entities/errors';
import {
  AddUserProps, GetUserProps, User, ListUserProps, UpdateUserProps, VisibleUser,
} from '../../entities/user';

export interface UserRepository {
  add(data: AddUserProps): Promise<void | EntityDuplicatedError>
  getVisible(data: GetUserProps): Promise<VisibleUser | EntityNotFoundError>
  get(data: GetUserProps): Promise<User | EntityNotFoundError>
  list(data: ListUserProps): Promise<VisibleUser[]>
  update(data: UpdateUserProps): Promise<VisibleUser | EntityNotFoundError>
  delete(id: string): Promise<boolean | EntityNotFoundError>
}
