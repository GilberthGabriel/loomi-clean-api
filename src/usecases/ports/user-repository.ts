import {
  AddUserProps, GetUserProps, User,
} from '../../entities/user';

export interface UserRepository {
  add(userData: AddUserProps): Promise<void>
  get(userData: GetUserProps): Promise<User>
  list(): Promise<User[]>
}
