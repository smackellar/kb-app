import { FieldDef } from './field-def';

export class TypeDef {
  id: number;
  name: string;
  fields: FieldDef[] = [];
}
