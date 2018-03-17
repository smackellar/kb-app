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
    if (catTypes.indexOf(field) > -1){
      catTypes.splice(catTypes.indexOf(field),1);
    } else {
      catTypes.push(field);
    }
    this.pushToService();
  }

  updateLabel(index, field): void {
    console.log(index + " - " + field);
    let oldField = this.typeDef.fields[index];
    this.typeDef.fields[index] = field;
    // should really keep the cats up to date too - this is where it gets messy
    this.typeDef.catTypes[this.typeDef.catTypes.indexOf(oldField)] = field;
    this.pushToService();
  }

  private pushToService(): void {
    this.defCurrentService.typeDef = this.typeDef;
  }

}
