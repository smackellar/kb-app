import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TypeDef } from './type-def';
import { TypeDefService } from './type-def.service'

@Injectable()
export class DefCurrentService {

  constructor(private typeDefService: TypeDefService) { }

  @Output() currentDef: EventEmitter <TypeDef> = new EventEmitter();

  private subject:Subject<TypeDef> = new BehaviorSubject<TypeDef>(null);

  subject$ = this.subject.asObservable();

  // private subject = new Subject<any>();

  _currentTypeDef: TypeDef;

  getSubject(): Observable<TypeDef>{
    return this.subject$;
  }

  get typeDef(): TypeDef{
    return this._currentTypeDef;
  }

  get id(): number{
    return this._currentTypeDef.id;
  }
  get name(): string{
    return this._currentTypeDef.name;
  }

  set typeDef(typeDef: TypeDef){
    this._currentTypeDef = typeDef;
    console.log("Emitting: " + typeDef.name)
    // this.subject.next({ TypeDef: typeDef });
    // this.currentDef.emit(typeDef);
    this.subject.next(typeDef);

  }

}
