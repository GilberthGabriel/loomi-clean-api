export interface ApplicationErrorConstructor {
  code: number
  message: string
}

export class ApplicationError extends Error {
  public readonly code: number;

  constructor(data: ApplicationErrorConstructor) {
    super(data.message);
    this.code = data.code;
  }
}
