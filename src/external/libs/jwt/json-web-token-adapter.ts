import JsonWebToken from 'jsonwebtoken';
import { JWTAdapter, JWTAdapterOptions, JWTAdapterResult } from '../../../usecases/ports';

export class JsonWebTokenAdapter implements JWTAdapter {
  constructor(public readonly secret: string) { }

  sign(options: JWTAdapterOptions): string {
    return JsonWebToken.sign(options.data, this.secret, {
      expiresIn: options.expiresIn,
    });
  }

  async verify(token: string): Promise<JWTAdapterResult> {
    try {
      const data = JsonWebToken.verify(token, this.secret);
      return { data, isValid: true };
    } catch {
      return { data: null, isValid: false };
    }
  }
}
