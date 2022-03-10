export interface ApplicationErrorConstructor {
  code: string
  message: string
}

export class ApplicationError extends Error {
  public readonly code: string;

  constructor(data: ApplicationErrorConstructor) {
    super(data.message);
    this.code = data.code;
  }
}
