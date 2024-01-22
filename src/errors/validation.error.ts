import { ZodError, ZodIssue } from 'zod';

class ValidationError {
  public readonly message: string;

  public readonly statusCode: number;
  public readonly issues: ZodIssue[]

  constructor(error: ZodError, statusCode = 400) {
    const [firstError] = error.issues;
    const { message: errorMessage } = firstError;

    this.issues = error.issues;
    this.message = errorMessage;
    this.statusCode = statusCode;
  }
}

export default ValidationError;
