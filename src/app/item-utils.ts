import { FieldDef } from './field-def';
import { Item } from './item';

/*
** Required because of the way Item objects are constructed from in memory data service
*/
export class ItemUtils {
  getValueByField(item: Item, field: FieldDef): any {
    return item.values[field.id];
  }
}
