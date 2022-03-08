import { CustomerRepository, UseCase } from '../ports';

export class DeleteCustomer implements UseCase {
  constructor(private readonly customerRepo: CustomerRepository) { }

  async perform(id: string): Promise<boolean> {
    return this.customerRepo.delete(id);
  }
}
