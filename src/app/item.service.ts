import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Item } from './item';
import { TypeDef } from './type-def';

@Injectable()
export class ItemService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private itemsUrl = 'api/items';  // URL to web api
  items: Promise<Item[]>;

  constructor(
    private http: Http
  ) {
    this.initItems();
  }

  getItems(typeDef: TypeDef): Promise<Item[]> {
    console.log("getting items");
    return this.http.get(this.itemsUrl+'?type=' + typeDef.id)
               .toPromise()
               .then(response => response.json().data as Item[])
               .catch(this.handleError);
  }

  private initItems(): void {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  newItem(typeDef: TypeDef, values: string[]): Promise<Item>{
    let newItem: Item = new Item();
    newItem.type = typeDef.id;

    // add values if they exist
    if (values){
      let fieldIndex = 0;
      for (let value of values){

        // check there is a field to populate
        if (fieldIndex + 1 > typeDef.fields.length)
          break;

        newItem.values[typeDef.fields[fieldIndex].id] = value;
        fieldIndex++;
      }
    }

    return this.insert(newItem);
  }

  delete(item): Promise<void> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => console.log("Deleting item: " + item.id))
      .catch(this.handleError);
  }

  getItem(id: number): Promise<Item> {
    if (id == -1){ // assume new Item
      return new Promise<Item>((resolve, reject) => {
        resolve(new Item());
      });
    };
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Item)
      .catch(this.handleError);
  }

  update(item: Item): Promise<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http
      .put(url, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(() => item)
      .catch(this.handleError);
  }

  insert(items: Item): Promise<Item> {
    const url = `${this.itemsUrl}`;
    items.id = null;
    return this.http
      .post(url, JSON.stringify(items), {headers: this.headers})
      .toPromise()
      .then(() => items)
      .catch(this.handleError);
  }

  addLink(item: Item, id: number){
    console.log("Adding link for : " + id);
    if (!item.links)
      item.links = [];
      console.log("Index : " + item.links.indexOf(id));
    if (item.links.indexOf(id) >= 0 || id == item.id)
      return;
    item.links.push(id);
  }

}
