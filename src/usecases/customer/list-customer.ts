import { Customer, ListCustomerProps } from '../../entities/customer';
import { CustomerRepository, UseCase } from '../ports';

export class ListCustomer implements UseCase {
  constructor(private readonly customerRepo: CustomerRepository) { }

  async perform(data: ListCustomerProps): Promise<Customer[]> {
    return this.customerRepo.list({
      skip: data.skip,
      limit: data.limit,
    });
  }
}
