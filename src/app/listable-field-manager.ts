import { Item }         from './item';
import { ItemUtils }         from './item-utils';
import { TypeDef }         from './type-def';
import { FieldDef }         from './field-def';
/*
** represents a categorisable (listable) field and the values
** and does all the management stuff
*/
export class ListableFieldManager {
  def: TypeDef;
  field: FieldDef; // the field that is categorised
  listableValues: any[] = [];
  itemUtils: ItemUtils;
  itemsByValue = {};

  constructor(field: FieldDef, items: Item[]) {
    this.itemUtils = new ItemUtils();
    this.field = field;
    this.setItems(items);
  }

  setItems(items: Item[]){
    for (let item of items){
      let value = this.itemUtils.getValueByField(item, this.field);
      if (this.listableValues.indexOf(value) == -1){
        this.listableValues.push(value);
      }
      // categorise items by value
      if (!this.itemsByValue[value]){
        this.itemsByValue[value] = [];
      }
      this.itemsByValue[value].push(item);
    }
    for (let lv of this.listableValues){
      console.log("manager vals: " + lv);
    }
  }

  public getItemsByValue(value: any){
    return this.itemsByValue[value];
  }

  // Check if any items are not where they should be
  refreshItem(item: Item){
    // for (let cat of this.cats){
    //   let itemInCat = cat.items.find(i => i.id == item.id);
    //   if (itemInCat)
    //     cat.items.splice(cat.items.indexOf(itemInCat),1);
    //   if (item.getValue(this.def.fields.indexOf(this.field)) == cat.name){
    //       cat.items.push(item);
    //   }
    // }
  }
}
