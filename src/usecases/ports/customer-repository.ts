import {
  AddCustomerProps, Customer, GetCustomerProps, ListCustomerProps, UpdateCustomerProps,
} from '../../entities/customer';

export interface CustomerRepository {
  add(data: AddCustomerProps): Promise<void>
  get(data: GetCustomerProps): Promise<Customer>
  list(data: ListCustomerProps): Promise<Customer[]>
  update(data: UpdateCustomerProps): Promise<Customer>
  delete(id: string): Promise<boolean>
}
