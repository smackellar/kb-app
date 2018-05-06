import { Item } from './item';

// represents a kanban list
export class ListValItems {
  value: any;
  items: Item[] = [];

  constructor(value: any){
    this.value = value;
  }

  // do this by id
  addItem(item: Item){
    if (!this.findItem(item)){
      this.items.push(item);
      console.log("added: " + item.id + " to " + this.value);
    }
  }

  findItem(item: Item){
    return this.items.find(i => (i.id == item.id));
  }

  // do this by id
  removeItem(item: Item){
    let foundItem: Item = this.findItem(item);
    if (!foundItem) return;
    this.items.splice(this.items.indexOf(foundItem), 1);
  }

}