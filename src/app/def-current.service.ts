import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TypeDef } from './type-def';

@Injectable()
export class DefCurrentService {

  constructor() { }

  @Output() currentDef: EventEmitter <TypeDef> = new EventEmitter();

  private subject:Subject<TypeDef> = new BehaviorSubject<TypeDef>(null);

  subject$ = this.subject.asObservable();
  _currentTypeDef: TypeDef;

  getSubject(): Observable<TypeDef>{
    return this.subject$;
  }

  get typeDef(): TypeDef{
    return this._currentTypeDef;
  }

  set typeDef(typeDef: TypeDef){
    this._currentTypeDef = typeDef;
    console.log("setting def to: " + typeDef.name);
    this.subject.next(typeDef);
  }

}
