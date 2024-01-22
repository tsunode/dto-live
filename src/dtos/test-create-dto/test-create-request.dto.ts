import { z } from 'zod';

import { AbstractDTO } from '../abstract.dto';

export const testCreateSchema = z.object({
  onlyTest: z.string(),
  otherTest: z.number()
});

export type TestCreate = z.infer<typeof testCreateSchema>;

export class TestCreateRequestDTO extends AbstractDTO<
  typeof testCreateSchema
> {
  protected rules() {
    return testCreateSchema;
  }
}
