import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TypeDef } from './type-def';
import { FieldDef } from './field-def';
//import { typeDefS } from './mock-typeDefs';

@Injectable()
export class TypeDefService {

  private typeDefsUrl = 'api/typeDefs';  // URL to web api
  typeDefs: Promise<TypeDef[]>;

  constructor(private http: Http) {
    this.initTypeDefs();
  }

  private initTypeDefs(){
    this.typeDefs = this.http.get(this.typeDefsUrl)
               .toPromise()
               .then(response => response.json().data as TypeDef[])
               .catch(this.handleError);
  }

  getTypeDefs(): Promise<TypeDef[]> {
    return this.typeDefs;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  update(typeDef: TypeDef): Promise<TypeDef> {
    const url = `${this.typeDefsUrl}/${typeDef.id}`;
    return this.http
      .put(url, JSON.stringify(typeDef), {headers: this.headers})
      .toPromise()
      .then(() => typeDef)
      .catch(this.handleError);
  }

  add(newTypeDef: TypeDef): Promise<TypeDef>{
    let maxId:number = 0;
    return this.getTypeDefs()
    .then(response =>
      {response.forEach(def => {
        if (def.id > maxId) maxId = def.id;
      });
      // return this.update(newTypeDef)    .then(() => newTypeDef)
      //     .catch(this.handleError);;
      // this.initTypeDefs();
    })
    .then(response => {
      newTypeDef.id = maxId + 1;
      newTypeDef.fields = [];
      console.log("Adding new type:" + newTypeDef.id);
      return this.update(newTypeDef);
    }
    );
  }

  delete(typeDef): Promise<void>{
    const url = `${this.typeDefsUrl}/${typeDef.id}`;
    return this.http
      .delete(url)
      .toPromise()
      .then(() => console.log("Deleting def: " + typeDef.id))
      .catch(this.handleError);
  }

  addField(typeDef: TypeDef, name: string): void{
    let maxId = 0;
    for (let field of typeDef.fields){
      if (field.id > maxId) maxId = field.id;
    }
    let newField = new FieldDef();
    newField.id = maxId + 1;
    newField.name = name;
    newField.isCardable = true;
    typeDef.fields.push(newField);
  }

}
