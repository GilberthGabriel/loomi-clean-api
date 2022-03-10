import { Customer, GetCustomerProps } from '../../entities/customer';
import { EntityNotFoundError } from '../../entities/errors';
import { CustomerRepository, UseCase } from '../ports';

export class GetCustomer implements UseCase {
  constructor(private readonly customerRepo: CustomerRepository) { }

  async perform(data: GetCustomerProps): Promise<Customer | EntityNotFoundError> {
    return this.customerRepo.get({
      id: data.id,
      phone: data.phone,
      email: data.email,
    });
  }
}
