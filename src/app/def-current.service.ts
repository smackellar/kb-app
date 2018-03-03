import { Injectable } from '@angular/core';
import { TypeDef } from './type-def';

@Injectable()
export class DefCurrentService {

  _currentTypeDef: TypeDef;

  get typeDef(): TypeDef{
    return this._currentTypeDef;
  }

  set typeDef(typeDef: TypeDef){
    this._currentTypeDef = typeDef;
  }

}
