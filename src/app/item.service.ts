import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Item } from './item';
//import { ITEMS } from './mock-items';

@Injectable()
export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api
  defSelect: string = "hero";
  items: Promise<Item[]>;

  constructor(private http: Http) {
    this.initItems();
  }

  getItems(): Promise<Item[]> {
console.log("getting items");
    return this.items;
  }

  private initItems(): void {
    this.items = this.http.get(this.itemsUrl+'?cat=' + this.defSelect)
               .toPromise()
               .then(response => response.json().data as Item[])
               .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getItem(id: number): Promise<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Item)
      .catch(this.handleError);
  }

  setDefSelect(defSelect: string){
    console.log("set def select in item service : " + defSelect);
    this.defSelect = defSelect;
    this.initItems();
  }

  getDefSelect(){
    return this.defSelect;
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  update(item: Item): Promise<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http
      .put(url, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(() => item)
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
