import { Customer, GetCustomerProps } from '../../entities/customer';
import { CustomerRepository, UseCase } from '../ports';

export class GetCustomer implements UseCase {
  constructor(private readonly customerRepo: CustomerRepository) { }

  async perform(data: GetCustomerProps): Promise<Customer> {
    return this.customerRepo.get({
      id: data.id,
      phone: data.phone,
      email: data.email,
    });
  }
}
