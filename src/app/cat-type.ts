import { Cat }         from './cat';
import { Item }         from './item';

export class CatType {
  name: string;
  cats: Cat[] = [];
  constructor(name: string, items: Item[]) {
    this.name = name;

  }

  setItems(items: Item[]){
    console.log("Initialise catType: " + this.name + " - " + items.length)
    for (let item of items){
      this.addCatIfNew(item[this.name]).items.push(item);
    }
  }

  addCatIfNew(newCatName: string): Cat {
    let catFound: Cat = this.cats.find(cat => cat.name == newCatName);
    if (!catFound){
      console.log("Cat " + newCatName + " new");
      catFound = new Cat(newCatName);
      this.cats.push(catFound);
    }
    return catFound;
  }

  // Check if any items are not where they should be
  refreshItem(item: Item){
    console.log("Refresh item cat " + item[this.name]);
    for (let cat of this.cats){
      console.log("Check cat " + cat.name);
      // remove the item if in wrong place
      if (cat.items.includes(item) && item[this.name] != cat.name){
        console.log("Removing item from " + cat.name);
        cat.items.splice(cat.items.indexOf(item),1);
      }
      // add the item if missing
      if (!cat.items.includes(item) && item[this.name] == cat.name){
        console.log("Adding item to " + cat.name);
        cat.items.push(item);
      }
    }
  }
}
