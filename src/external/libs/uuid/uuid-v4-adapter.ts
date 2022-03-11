import { v4 } from 'uuid';
import { UuidAdapter } from '../../../usecases/ports';

export class UuidV4Adapter implements UuidAdapter {
  generate(): string {
    return v4();
  }
}
