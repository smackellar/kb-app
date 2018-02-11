import { Component, OnInit, Input } from '@angular/core';

import { Item } from './item';
import { CatType } from './cat-type';
import { ItemService } from './item.service';

@Component({
  selector: 'my-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: [ './kanban.component.css' ]
})

export class KanbanComponent implements OnInit {

  items: Item[] = [];
  cats: string[] = [];
  catTypes: CatType[] = [
    new CatType('status', this.items),
    new CatType('colour', this.items)
  ];
  newCats: string[] = [];
  @Input() catTypeSelect: CatType = this.catTypes[0];
  @Input() newCat: string = "";

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
      this.itemService.getItems()
        .then(items => this.initItems(items));
  }

  private initItems(items){
    this.items = items;
    this.catTypeSelect.setItems(this.items);
  }

  updateCatTypeSelect(): void {
    this.catTypeSelect.setItems(this.items);
  }

  addCat(): void {
    if (this.newCat.length == 0){
      console.log("Category is empty" + this.newCat);
      return;
    }
    this.catTypeSelect.addCatIfNew(this.newCat);
  }

}
