import { Component, OnInit, Input } from '@angular/core';

import { Item } from './item';
import { CatType } from './cat-type';
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
  catTypes: CatType[];
  newCats: string[] = [];
  @Input() catTypeSelect;
  @Input() newCat: string = "";

  constructor(
    private route: ActivatedRoute,
    private defCurrentService: DefCurrentService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => {
       if (def) {
         console.log("from subscription: " + def.name);
         this.itemService.getItems(def)
             .then(items => this.initItems(this.items = items));
       }
    });
  }

  private initItems(items){
    this.items = items;
    this.catTypes = [
      new CatType('status', this.items),
      new CatType('colour', this.items)
    ];
    this.catTypeSelect = this.catTypes[0];
  }

  addCat(): void {
    if (this.newCat.length == 0){
      console.log("Category is empty" + this.newCat);
      return;
    }
    this.catTypeSelect.addCatIfNew(this.newCat);
  }

}
