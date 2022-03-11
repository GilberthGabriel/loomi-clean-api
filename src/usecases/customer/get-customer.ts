import { VisibleCustomer, GetCustomerProps } from '../../entities/customer';
import { EntityNotFoundError } from '../../entities/errors';
import { CustomerRepository, UseCase } from '../ports';

export class GetCustomer implements UseCase {
  constructor(private readonly customerRepo: CustomerRepository) { }

  async perform(data: GetCustomerProps): Promise<VisibleCustomer | EntityNotFoundError> {
    return this.customerRepo.getVisible({
      id: data.id,
      phone: data.phone,
      email: data.email,
    });
  }
}
