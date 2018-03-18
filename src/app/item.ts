import { FieldDef } from './field-def';

export class Item {
  id: number;
  type: number;
  values: any[];
  private _tags: string;
  tagList: Array<string>;
  links: Array<number>;

  getValue(fieldIndex: number): any {
    return this.values[fieldIndex];
  }
}
