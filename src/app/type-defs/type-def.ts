import { FieldDef } from './../fields/field-def';

export class TypeDef {
  id: number;
  name: string;
  fields: FieldDef[] = [];
  deleted: boolean = false;
}
