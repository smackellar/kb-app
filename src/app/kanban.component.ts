import { Component, OnInit, Input } from '@angular/core';

import { Item } from './item';
import { CatType } from './cat-type';
import { ItemService } from './item.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

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
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems()
      .then(items => this.initItems(this.items = items));
      console.log("defType = " + this.route.snapshot.params['defType']);

  }

  private initItems(items){
    this.items = items;
    this.catTypes = [
      new CatType('status', this.items),
      new CatType('colour', this.items)
    ];
    this.catTypeSelect = this.catTypes[0];
    // this.catTypeSelect.setItems(this.items);
  }

  updateCatTypeSelect(): void {
    // this.catTypeSelect.setItems(this.items);
  }

  addCat(): void {
    if (this.newCat.length == 0){
      console.log("Category is empty" + this.newCat);
      return;
    }
    this.catTypeSelect.addCatIfNew(this.newCat);
  }

}
