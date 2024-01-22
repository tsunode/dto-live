import { z } from 'zod';

type Error = Parameters<z.ZodErrorMap>['0'];
type Ctx = Parameters<z.ZodErrorMap>['1'];
type Field = string | number | undefined;

export class ZodErrorMap {
  private currentField: Field;
  private ctx: Ctx;

  public execute(error: Error, ctx: Ctx) {
    const { code, path } = error;

    this.ctx = ctx;
    this.currentField = path.at(-1);

    const filteredPath = error.path.filter((field) => field === this.currentField);
    const hasToIgnoreField = filteredPath.length > 1;

    if (hasToIgnoreField) {
      return { message: ctx.defaultError };
    }

    switch (code) {
      case z.ZodIssueCode.invalid_type:
        return this.handleInvalidTypeError(error);

      case z.ZodIssueCode.too_small:
        return this.handleTooSmallError(error);

      case z.ZodIssueCode.too_big:
        return this.handleTooBigError(error);

      case z.ZodIssueCode.invalid_string:
        return this.handleInvalidStringError(error);

      default:
        return { message: ctx.defaultError };
    }
  }

  private handleInvalidTypeError(
    error: z.ZodInvalidTypeIssue,
  ) {
    const { received, expected } = error;

    if (received === 'undefined') {
      return { message: `O campo [${this.currentField}] é obrigatório` };
    }

    switch (expected) {
      case 'string':
        return { message: `O campo [${this.currentField}] deve ser uma string` };

      case 'number':
        return { message: `O campo [${this.currentField}] deve ser um número` };

      default: 
        return { message: this.ctx.defaultError };
    }
  }

  private handleTooSmallError(
    error: z.ZodTooSmallIssue,
  ) {
    const { type, minimum } = error;

    switch (type) {
      case 'string':
        if (error.exact) {
          return {
            message: `O campo [${this.currentField}] deve conter ${minimum} caracteres`,
          };
        }
        return {
          message: `O campo [${this.currentField}] deve conter no mínimo ${minimum} caracteres`,
        };
      case 'number':
        if (error.exact) {
          return {
            message: `O campo [${this.currentField}] deve ser igual a ${minimum}`,
          };
        }
        return {
          message: `O campo [${this.currentField}] deve ser maior ou igual a ${minimum}`,
        };

      default: 
        return { message: this.ctx.defaultError };
    }
  }

  private handleTooBigError(error: z.ZodTooBigIssue) {
    const { type, maximum } = error;

    switch (type) {
      case 'string':
        if (error.exact) {
          return {
            message: `O campo [${this.currentField}] deve conter ${maximum} caracteres`,
          };
        }
        return {
          message: `O campo [${this.currentField}] deve conter no máximo ${maximum} caracteres`,
        };
      case 'number':
        if (error.exact) {
          return {
            message: `O campo [${this.currentField}] deve ser igual a ${maximum}`,
          };
        }
        return {
          message: `O campo [${this.currentField}] deve ser menor ou igual a ${maximum}`,
        };

      default: 
        return { message: this.ctx.defaultError };
    }
  }

  private handleInvalidStringError(
    error: z.ZodInvalidStringIssue,
  ) {
    const { validation } = error;
    switch (validation) {
      case 'email':
        return {
          message: `O campo [${this.currentField}] deve ser um email`,
        };
      case 'uuid':
        return {
          message: `O campo [${this.currentField}] deve ser um uuid`,
        };

      default: 
        return { message: this.ctx.defaultError };
    }

  }
}
