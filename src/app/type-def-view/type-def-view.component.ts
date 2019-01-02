import { Component, Input, OnInit } from '@angular/core';

import { TypeDef } from '../type-def';
import { DefCurrentService } from '../def-current.service';
import { TypeDefService } from '../type-def.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'type-def-view',
  templateUrl: './type-def-view.component.html'
})

export class TypeDefViewComponent implements OnInit {

  @Input() typeDef: TypeDef;
  @Input() newFieldName: string;

  constructor(
    private defCurrentService: DefCurrentService,
    private location: Location,
    private router: Router,
    private typeDefService: TypeDefService
  ) {
  }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => this.typeDef = def);
    this.initNewFieldName();
  }
  initNewFieldName(): void {
    this.newFieldName = "Field " + (this.typeDef.fields.length + 1);
  }

  toggleCatField(field): void {
    field.isListable = !field.isListable;
    this.pushToService();
  }

  toggleCardField(field): void {
    field.isCardable = !field.isCardable;
    this.pushToService();
  }

  updateLabel(field, newName): void {
    field.name = newName;
    this.pushToService();
  }

  addField(): void {
    if (!this.newFieldName)
      return;
    this.typeDefService.addField(this.typeDef, this.newFieldName);
    this.typeDefService.update(this.typeDef);
    this.initNewFieldName();
  }
  removeField(field): void {
    this.typeDefService.removeField(this.typeDef, field);
  }

  removeDefSelect(): void {
    console.log("about to delete type");
    this.typeDefService.delete(this.typeDef)
    .subscribe(() => {
      console.log("Deleted type: " + this.typeDef.name);
      this.router.navigateByUrl("/");
    });
  }

  private pushToService(): void {
    this.defCurrentService.typeDef = this.typeDef;
  }

  goBack(): void {
    this.location.back();
  }
}
