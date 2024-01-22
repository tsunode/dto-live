import { type ZodType, ZodError, z } from 'zod';

import ValidationError from '../errors/validation.error';


import { ZodErrorMap } from './custom-error-map';
import AppError from 'src/errors/app.error';

/**
 * @class AbstractDTO
 * @description Este modelo permite reaproveitarmos as validações dos dados
 * que serão transitados durante as operações.
 */
export abstract class AbstractDTO<Schema extends ZodType> {
  protected zodErrorMap: ZodErrorMap;
  protected data: z.infer<Schema>;

  public constructor(
    data: Record<string, unknown>,
    protected path: Array<Exclude<keyof z.infer<Schema>, symbol>> = [],
  ) {
    this.path = path;
    this.zodErrorMap = new ZodErrorMap();
    this.validate(data);
  }

  protected abstract rules(): Schema;

  public getAll(): z.infer<Schema> {
    return this.data;
  }

  public get<K extends keyof z.infer<Schema>>(key: K) {
    return this.data[key];
  }

  private validate(data: unknown) {
    try {
      this.data = this.rules().parse(data, {
        errorMap: this.zodErrorMap.execute.bind(this.zodErrorMap),
        path: this.path,
      });
    } catch (error) {
      console.error(error)

      if (error instanceof ZodError) {
        throw new ValidationError(error);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
}
