import { Cat }         from './cat';
import { Item }         from './item';
import { TypeDef }         from './type-def';
import { FieldDef }         from './field-def';
/*
** represents a categorisable (listable) field and the values
** and does all the management stuff
*/
export class CatType {
  // name: string;
  def: TypeDef;
  field: FieldDef; // the field that is categorised
  cats: Cat[] = [];
  constructor(field: FieldDef, items: Item[]) {
    this.field = field;
    this.setItems(items);
  }

  setItems(items: Item[]){
    for (let item of items){
      this.addCatIfNew(item[this.field.name]).items.push(item);
    }
  }

  addCatIfNew(newCatName: string): Cat {
    let catFound: Cat = this.cats.find(cat => cat.name == newCatName);
    if (!catFound){
      catFound = new Cat(newCatName);
      this.cats.push(catFound);
    }
    return catFound;
  }

  // Check if any items are not where they should be
  refreshItem(item: Item){
    for (let cat of this.cats){
      let itemInCat = cat.items.find(i => i.id == item.id);
      if (itemInCat)
        cat.items.splice(cat.items.indexOf(itemInCat),1);
      if (item.getValue(this.def.fields.indexOf(this.field)) == cat.name){
          cat.items.push(item);
      }
    }
  }
}
