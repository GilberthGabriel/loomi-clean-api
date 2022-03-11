import { AddCustomerProps, VisibleCustomer } from '../../entities/customer';
import { EntityDuplicatedError } from '../../entities/errors';
import { CustomerRepository, PasswordAdapter, UseCase } from '../ports';

export class AddCustomer implements UseCase {
  constructor(
    private readonly customerRepo: CustomerRepository,
    private readonly passwordAdapter: PasswordAdapter,
  ) { }

  async perform(data: AddCustomerProps): Promise<VisibleCustomer | EntityDuplicatedError> {
    const hashPassoword = await this.passwordAdapter.hash(data.password, 10);
    return this.customerRepo.add({
      name: data.name,
      email: data.email,
      password: hashPassoword,
      address: data.address,
      phone: data.phone,
    });
  }
}
