import { z } from 'zod';

import { AbstractDTO } from '../abstract.dto';

export const testCreateSchema = z.object({
  onlyTest: z.string(),
});

export type TestCreate = z.infer<typeof testCreateSchema>;

export class TestCreateResponseDTO extends AbstractDTO<
  typeof testCreateSchema
> {
  protected rules() {
    return testCreateSchema;
  }
}
