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
    field.isListable = !field.isListable;
    this.pushToService();
  }

  updateLabel(field, newName): void {
    field.name = newName;
    this.pushToService();
  }

  private pushToService(): void {
    this.defCurrentService.typeDef = this.typeDef;
  }

}
