import { AddCustomerProps } from '../../entities/customer';
import { CustomerRepository, UseCase } from '../ports';

export class AddCustomer implements UseCase {
  constructor(private readonly customerRepo: CustomerRepository) { }

  async perform(data: AddCustomerProps): Promise<void> {
    return this.customerRepo.add({
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone,
    });
  }
}
