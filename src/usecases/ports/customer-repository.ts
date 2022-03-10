import {
  AddCustomerProps, Customer, GetCustomerProps, ListCustomerProps, UpdateCustomerProps,
} from '../../entities/customer';
import { EntityDuplicatedError, EntityNotFoundError } from '../../entities/errors';

export interface CustomerRepository {
  add(data: AddCustomerProps): Promise<void | EntityDuplicatedError>
  get(data: GetCustomerProps): Promise<Customer | EntityNotFoundError>
  list(data: ListCustomerProps): Promise<Customer[]>
  update(data: UpdateCustomerProps): Promise<Customer | EntityNotFoundError>
  delete(id: string): Promise<boolean | EntityNotFoundError>
}
