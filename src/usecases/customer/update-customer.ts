import { VisibleCustomer, UpdateCustomerProps } from '../../entities/customer';
import { EntityNotFoundError } from '../../entities/errors';
import { CustomerRepository, UseCase } from '../ports';

export class UpdateCustomer implements UseCase {
  constructor(private readonly customerRepo: CustomerRepository) { }

  async perform(data: UpdateCustomerProps): Promise<VisibleCustomer | EntityNotFoundError> {
    return this.customerRepo.update({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone,
    });
  }
}
