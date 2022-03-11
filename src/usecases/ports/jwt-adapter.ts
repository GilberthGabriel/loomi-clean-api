export interface JWTAdapterOptions {
  expiresIn: string,
  data: any
}

export interface JWTAdapterResult {
  isValid: boolean,
  data: any
}

export interface JWTAdapter {
  sign(options: JWTAdapterOptions): string
  verify(token: string): Promise<JWTAdapterResult>
}
