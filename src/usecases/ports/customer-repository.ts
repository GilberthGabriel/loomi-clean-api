import {
  AddCustomerProps,
  Customer,
  GetCustomerProps,
  ListCustomerProps,
  UpdateCustomerProps,
  VisibleCustomer,
} from '../../entities/customer';
import { EntityDuplicatedError, EntityNotFoundError } from '../../entities/errors';

export interface CustomerRepository {
  add(data: AddCustomerProps): Promise<VisibleCustomer | EntityDuplicatedError>
  get(data: GetCustomerProps): Promise<Customer | EntityNotFoundError>
  getVisible(data: GetCustomerProps): Promise<VisibleCustomer | EntityNotFoundError>
  list(data: ListCustomerProps): Promise<VisibleCustomer[]>
  update(data: UpdateCustomerProps): Promise<VisibleCustomer | EntityNotFoundError>
  delete(id: string): Promise<boolean | EntityNotFoundError>
}
