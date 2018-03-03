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


  // getTypeDef(id: number): Promise<TypeDef> {
  //   const url = `${this.typeDefsUrl}/${id}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json().data as TypeDef)
  //     .catch(this.handleError);
  // }
  //
  private headers = new Headers({'Content-Type': 'application/json'});
  update(typeDef: TypeDef): Promise<TypeDef> {
    const url = `${this.typeDefsUrl}/${typeDef.id}`;
    return this.http
      .put(url, JSON.stringify(typeDef), {headers: this.headers})
      .toPromise()
      .then(() => typeDef)
      .catch(this.handleError);
  }

}
