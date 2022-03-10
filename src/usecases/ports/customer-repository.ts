import {
  AddCustomerProps, Customer, GetCustomerProps, ListCustomerProps, UpdateCustomerProps,
} from '../../entities/customer';
import { EntityNotFoundError } from '../../entities/errors';

export interface CustomerRepository {
  add(data: AddCustomerProps): Promise<void>
  get(data: GetCustomerProps): Promise<Customer | EntityNotFoundError>
  list(data: ListCustomerProps): Promise<Customer[]>
  update(data: UpdateCustomerProps): Promise<Customer>
  delete(id: string): Promise<boolean>
}
