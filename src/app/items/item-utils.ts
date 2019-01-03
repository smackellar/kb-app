import { FieldDef } from './../fields/field-def';
import { Item } from './item';

/*
** Required because of the way Item objects are constructed from in memory data service
*/
export class ItemUtils {
  getValueByField(item: Item, field: FieldDef): any {
    if (!field)
      return undefined;
    return item.values[field.id];
  }
}
