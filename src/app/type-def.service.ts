import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TypeDef } from './type-def';
//import { typeDefS } from './mock-typeDefs';

@Injectable()
export class TypeDefService {

  private typeDefsUrl = 'api/typeDefs';  // URL to web api
  typeDefs: Promise<TypeDef[]>;

  constructor(private http: Http) {
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

  add(name: string){
    let newTypeDef: TypeDef = new TypeDef();
    newTypeDef.name = name;
    let maxId:number = 0;
    this.getTypeDefs().then(response =>
      {response.forEach(def => {
        console.log(def.id);
        if (def.id > maxId) maxId = def.id;
      });
      maxId++;
      newTypeDef.id = maxId;;
      console.log("Adding new type:" + newTypeDef.id);
      this.update(newTypeDef);
    }
    );
  }

}
