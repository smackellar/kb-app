import { Injectable } from '@angular/core';
import { Item }         from './item';
import { ListValItems }         from './list-val-items';
import { ItemUtils }         from './item-utils';
import { TypeDef }         from './type-def';
import { FieldDef }         from './field-def';
/*
** represents a categorisable (listable) field and the values
** and does all the management stuff
*/
@Injectable()
export class ListableFieldManager {
  def: TypeDef;
  field: FieldDef; // the field that is categorised
  itemUtils: ItemUtils;
  lists: ListValItems[] = [];

  constructor(field: FieldDef, items: Item[]) {
    this.itemUtils = new ItemUtils();
    this.field = field;
    this.setItems(items);
  }

  setItems(items: Item[]){
    // go through list of items and find out which list they belong to
    for (let item of items){
      let value = this.itemUtils.getValueByField(item, this.field);
      let list = this.getList(value);
      list.addItem(item);
    }

    for (let lv of this.lists){
      console.log("manager vals2: " + lv.value);
    }
  }

  private getList(value: any){
    let list: ListValItems = this.lists.find(listItem => (listItem.value == value));
    if (!list){
      console.log("new list for " + value);
      list = new ListValItems(value);
      this.lists.push(list);
    }
    return list;
  }

  // Check if any items are not where they should be
  refreshItem(item: Item){
    let itemVal = this.itemUtils.getValueByField(item, this.field);
    console.log("refreshing item: " + itemVal)
    // find items
    for (let list of this.lists){
      if (list.findItem(item) && list.value != itemVal){
        // remove from this list where no longer matches
        list.removeItem(item);
      }
      if (!list.findItem(item) && list.value == itemVal){
        // add to list it should be in
        list.addItem(item);
      }
    }

  }
}
