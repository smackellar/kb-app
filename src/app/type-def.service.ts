import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import { TypeDef } from './type-def';
import { FieldDef } from './field-def';
//import { typeDefS } from './mock-typeDefs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TypeDefService {

  constructor(private http: HttpClient) { }

  private typeDefsUrl = 'api/typeDefs';  // URL to web api
  typeDefs: Observable<TypeDef[]>;

  getTypeDefs(): Observable<TypeDef[]> {
    return this.http.get<TypeDef[]>(this.typeDefsUrl + "?deleted=false");
  }

  getTypeDef(id: number): Observable<TypeDef> {
    return this.http.get<TypeDef>(this.typeDefsUrl + "/" + id);
  }

  update(typeDef: TypeDef): Observable<TypeDef> {
    const url = `${this.typeDefsUrl}/${typeDef.id}`;
    return this.http.put<TypeDef>(url, typeDef, httpOptions);
  }

  insert(typeDef: TypeDef): Observable<TypeDef> {
    const url = `${this.typeDefsUrl}`;
    return this.http.post<TypeDef>(url, typeDef, httpOptions);
  }

  add(newTypeDef: TypeDef): Observable<TypeDef>{
      return this.insert(newTypeDef);
  }

  delete(typeDef): Observable<TypeDef>{
    typeDef.deleted = true;
    return this.update(typeDef);
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
    (typeDef.fields as Array<FieldDef>).push(newField);
  }

  removeField(typeDef: TypeDef, fieldDef: FieldDef): void{
    (typeDef.fields as Array<FieldDef>).splice((typeDef.fields as Array<FieldDef>).indexOf(fieldDef),1);
  }

}
