import { Injectable } from '@angular/core';
import { Item }         from './item';
import { ListValItems }         from './list-val-items';
import { ItemUtils }         from './item-utils';
import { TypeDef }         from './type-def';
import { FieldDef }         from './field-def';

import { ItemService } from './item.service';

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
  itemService: ItemService;

  constructor(itemService: ItemService, field: FieldDef, items: Item[]) {
    this.itemUtils = new ItemUtils();
    this.field = field;
    this.setItems(items);
    this.itemService = itemService;
  }

  setItems(items: Item[]){
    // go through list of items and find out which list they belong to
    for (let item of items){
      let value = this.itemUtils.getValueByField(item, this.field);
      let list = this.getList(value);
      list.addItem(item);
    }
  }

  getList(value: any){
    let list: ListValItems = this.findList(value);
    if (!list){
      list = new ListValItems(value);
      this.lists.push(list);
    }
    return list;
  }

  private findList(value: any){
    return this.lists.find(listItem => (listItem.value == value));
  }

  // Check if any items are not where they should be
  refreshItem(item: Item){
    let itemVal = this.itemUtils.getValueByField(item, this.field);
    console.log("refreshing item: " + item.id + " with value " + itemVal)
    // find items
    let listFound: boolean;
    for (let list of this.lists){
      console.log("checking list: " + list.value);
      // track if a list is found at all
      listFound = listFound || list.findItem(item) != null;
      if (list.findItem(item) && list.value != itemVal){
        // remove from this list where no longer matches
        list.removeItem(item);
      }
      if (!list.findItem(item) && list.value == itemVal){
        // add to list it should be in
        list.addItem(item);
      }
    }
    // if no list found, then create one and add this item to it
    if (!listFound){
      this.getList(itemVal).addItem(item);
    }

  }

  // remove empty lists
  removeList(list: ListValItems){
    if (list && list.items.length == 0){
      this.lists.splice(this.lists.indexOf(list),1);
    }
  }

  updateListName(oldValue: any, newValue: any){
    let list: ListValItems = this.getList(oldValue);
    if (!list){
      console.log("List not found: " + oldValue);
    }
    // check if the name exists already
    if (this.findList(newValue)){
      console.log("List exists: " + newValue);
      return;
    }

    // update the list and its contents
    list.value = newValue;
    for (let item of list.items){
      item.values[this.field.id] = newValue;
      this.itemService.update(item).subscribe(() => {});
    }
  }
}
