import { Component, OnInit, Input } from '@angular/core';

import { Item } from './item';
import { CatType } from './cat-type';
import { TypeDef } from './type-def';
import { FieldDef } from './field-def';
import { ItemService } from './item.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DefCurrentService } from './def-current.service';

@Component({
  selector: 'my-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: [ './kanban.component.css' ]
})

export class KanbanComponent implements OnInit {

  items: Item[] = [];
  cats: string[] = [];
  // catTypes: CatType[];
  @Input() fieldSelect: FieldDef;
  @Input() newCat: string = "";
  catTypeSelect: CatType;

  constructor(
    private route: ActivatedRoute,
    private defCurrentService: DefCurrentService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => {
       if (def) {
         console.log("from subscription: " + def.name);
         this.itemService.getItems(def)
             .then(items => this.initItems(items, def));
             // this.catTypes = [];
          // update category types - BROKEN
          // for (let catTypeLabel of def.catTypes){
          //   this.catTypes.push(new CatType(catTypeLabel, this.items));
          // }
       }
    });
  }
  private initFieldSelected(def: TypeDef){
    // first find a field (will break if none)
    this.fieldSelect = def.fields.filter(f => f.isListable)[0]
  }

  private initItems(items: Item[], def: TypeDef){
    // put
    this.items = items;
    // this.catTypes = [];
    //  for (let field of def.fields){
    //    if (field.isListable){
    //      this.catTypes.push(new CatType(field.name, this.items));
    //    }
    //  }
  }

  addCat(): void {
    if (this.newCat.length == 0){
      console.log("Category is empty" + this.newCat);
      return;
    }
    this.catTypeSelect.addCatIfNew(this.newCat);
  }

}
