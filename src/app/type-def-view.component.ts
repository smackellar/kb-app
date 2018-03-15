import { Component, Input, ElementRef, OnInit } from '@angular/core';

import { TypeDef } from './type-def';
import { DefCurrentService } from './def-current.service';


@Component({
  selector: 'type-def-view',
  templateUrl: './type-def-view.component.html'
})

export class TypeDefViewComponent implements OnInit {

  @Input() typeDef: TypeDef;

  constructor(
    private defCurrentService: DefCurrentService
  ) {
  }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => this.typeDef = def);
  }

  toggleCatField(field): void {
    let catTypes = this.typeDef.catTypes;
    if (catTypes.indexOf(field) >- 1){
      catTypes.splice(catTypes.indexOf(field),0);
    } else {
      catTypes.push(field);
    }
    console.log(field);
  }

}
