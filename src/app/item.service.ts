import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import { Item } from './item';
import { TypeDef } from './type-def';


  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api
  // items: Promise<Item[]>;



  constructor(private http: HttpClient) {
    this.initItems();
  }

  getItems(typeDef: TypeDef): Observable<Item[]> {
    console.log("getting items");
    return this.http.get<Item[]>(this.itemsUrl+'?type=' + typeDef.id);
  }

  private initItems(): void {

  }

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }

  newItem(typeDef: TypeDef, values: string[]): Observable<Item>{
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

  delete(item): Observable<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.delete<Item>(url);
  }

  getItem(id: number): Observable<Item> {
    // if (id == -1){ // assume new Item
      const url: string = `${this.itemsUrl}/${id}`;
      return this.http.get<Item>(url);
      // return new Promise<Item>((resolve, reject) => {
      //   resolve(new Item());
      // });
    // };
    // const url = `${this.itemsUrl}/${id}`;
    // return this.http.get(url)
    //   .toPromise()
    //   .then(response => response.json().data as Item)
    //   .catch(this.handleError);
  }

  update(item: Item): Observable<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.put<Item>(url, httpOptions);
  }

  insert(item: Item): Observable<Item> {
    const url = `${this.itemsUrl}`;
    item.id = null;
    return this.http.post<Item>(url, item, httpOptions);
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
