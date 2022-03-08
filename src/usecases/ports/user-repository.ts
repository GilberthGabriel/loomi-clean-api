import {
  AddUserProps, GetUserProps, User, ListUserProps,
} from '../../entities/user';

export interface UserRepository {
  add(userData: AddUserProps): Promise<void>
  get(userData: GetUserProps): Promise<User>
  list(data: ListUserProps): Promise<User[]>
}
