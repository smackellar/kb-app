import { Component, Input, ElementRef, OnInit } from '@angular/core';

import { TypeDef } from './type-def';
import { DefCurrentService } from './def-current.service';
import { TypeDefService } from './type-def.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'type-def-view',
  templateUrl: './type-def-view.component.html'
})

export class TypeDefViewComponent implements OnInit {

  @Input() typeDef: TypeDef;
  @Input() newFieldName: string = "";

  constructor(
    private router: Router,
    private defCurrentService: DefCurrentService,
    private typeDefService: TypeDefService
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

  addField(): void {
    console.log(this.newFieldName);
    if (!this.newFieldName)
      return;
    this.typeDefService.addField(this.typeDef, this.newFieldName);
    this.typeDefService.update(this.typeDef);
    this.newFieldName = "";
  }

  removeDefSelect(): void {
    this.typeDefService.delete(this.typeDef)
    .then(() => {
      console.log("Deleted: " + this.typeDef.name);
      // this.defSelect = undefined;
      this.router.navigateByUrl("/defs");
    });
  }

  private pushToService(): void {
    this.defCurrentService.typeDef = this.typeDef;
  }

}
