import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TypeDef } from './type-def';
import { FieldDef } from './field-def';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TypeDefService implements OnInit {

  ngOnInit(): void {
  }

  constructor(private http: HttpClient) { }

  private typeDefs:Subject<TypeDef[]> = new BehaviorSubject<TypeDef[]>(null);

  subject$ = this.typeDefs.asObservable();

  private typeDefsUrl = 'api/typeDefs';  // URL to web api
  // typeDefs: Observable<TypeDef[]>;

  getTypeDefs(): Observable<TypeDef[]> {
    this.updateTypeDefs(); // could be done OnInit
    return this.typeDefs;
  }

  private updateTypeDefs(){
    this.http.get<TypeDef[]>(this.typeDefsUrl + "?deleted=false").subscribe(
      typeDefs => {
        this.typeDefs.next(typeDefs);
      }
    );
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
    return this.insert(newTypeDef).pipe(tap(() => {
      this.updateTypeDefs();
    }));
  }

  delete(typeDef): Observable<TypeDef>{
    typeDef.deleted = true;
    return this.update(typeDef).pipe(tap(() => {
      this.updateTypeDefs();
    }));
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
