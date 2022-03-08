import {
  AddUserProps, GetUserProps, User, ListUserProps, UpdateUserProps,
} from '../../entities/user';

export interface UserRepository {
  add(userData: AddUserProps): Promise<void>
  get(userData: GetUserProps): Promise<User>
  list(data: ListUserProps): Promise<User[]>
  update(userData: UpdateUserProps): Promise<User>
}
