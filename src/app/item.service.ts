import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Item } from './item';
import { TypeDef } from './type-def';


  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api

  private subject:Subject<Item> = new BehaviorSubject<Item>(null);

  subject$ = this.subject.asObservable();

  constructor(private http: HttpClient) {
    this.initItems();
  }

  getItems(typeDef: TypeDef): Observable<Item[]> {
    console.log("getting items");
    return this.http.get<Item[]>(this.itemsUrl+'?type=' + typeDef.id);
  }

  private initItems(): void {

  }

  newItem(typeDef: TypeDef, values: string[]): Observable<Item>{
    let newItem: Item = new Item();
    newItem.type = typeDef.id;


    // add values if they exist
    if (values){
      console.log('typeDef id:' + newItem.type);
      console.log(values.join('-'));
      let fieldIndex = 0;
      for (let value of values){

        // check there is a field to populate
        if (fieldIndex + 1 > typeDef.fields.length)
          break;

        newItem.values[typeDef.fields[fieldIndex].id] = value;
        console.log('fieldIndex:' + fieldIndex);
        fieldIndex++;
      }
    }

    console.log('adding item:' + newItem.values.toString());
    return this.insert(newItem);
  }

  delete(item): Observable<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.delete<Item>(url);
  }

  getItem(id: number): Observable<Item> {
    const url: string = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  update(item: Item): Observable<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.put<Item>(url, item, httpOptions);
  }

  insert(item: Item): Observable<Item> {
    const url = `${this.itemsUrl}`;
    item.id = null;
    return this.http.post<Item>(url, item, httpOptions).pipe(tap(item => {
      console.log("Tapped item: " + item.id);
      this.broadcast(item);
    }));
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

  broadcast(item: Item){
    this.subject.next(item);
  }

  getSubject(): Observable<Item>{
    return this.subject$;
  }
}
