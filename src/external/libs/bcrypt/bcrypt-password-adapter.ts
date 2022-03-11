import Bcrypt from 'bcrypt';
import { PasswordAdapter } from '../../../usecases/ports';

export class BcryptPasswordAdapter implements PasswordAdapter {
  compare(password: string, hash: string): Promise<boolean> {
    return Bcrypt.compare(password, hash);
  }

  async hash(password: string, salt: number): Promise<string> {
    return Bcrypt.hash(password, salt);
  }
}
