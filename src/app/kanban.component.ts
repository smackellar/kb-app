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
    new CatType('status'),
    new CatType('colour')
  ];
  newCats: string[] = [];
  @Input() catTypeSelect: CatType = this.catTypes[0];
  @Input() newCat: string = "";

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
      this.itemService.getItems()
        .then(items => this.setItems(items));
  }

  private setItems(items){
    this.items = items;
    this.initCatsFromItems();
  }

  private initCatsFromItems(): void {
    for (let item of this.items){
      for (let catType of this.catTypes){
        catType.addCat(item[catType.name]);
      }
    }
  }

  addCat(): void {
    if (this.newCat.length == 0){
      console.log("Category is empty" + this.newCat);
      return;
    }
    if (this.catTypeSelect.cats.includes(this.newCat)) {
      console.log("Category exists: " + this.newCat);
      return;
    }
    this.catTypeSelect.cats.push(this.newCat);
    this.newCat = "";
  }

}
