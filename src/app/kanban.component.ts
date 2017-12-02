import { Component, OnInit, Input } from '@angular/core';

import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'my-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: [ './kanban.component.css' ]
})

export class KanbanComponent implements OnInit {

  items: Item[] = [];
  @Input() catSelect: string = 'status';
  cats: string[] = [];
  catTypes: string[] = ['status','colour'];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
      this.itemService.getItems()
        .then(items => this.setItems(items));
  }

  private setItems(items){
    this.items = items;
    this.updateCats();
  }

  private updateCats(): void {
    this.cats = [];
    for (let item of this.items){
      this.addCat(item[this.catSelect]);
    }
  }

  private addCat(catVal: string){
    console.log("catVal: " + catVal);
    if(this.cats.indexOf(catVal)<0){
      this.cats.push(catVal);
    }
  }

  updateCatType(newCatSelect): void {
    console.log("changing:" + this.catSelect + " to " + newCatSelect);
    this.catSelect = newCatSelect;
    this.updateCats();
  }

  onDrop(event : any, cat : string): void {
    // loop through items to find the one that needs to be updated
    for (let item of this.items){
      if (item.id == parseInt(event)){
        item[this.catSelect] = cat;
        console.log(item[this.catSelect]);
        this.updateItem(item);
      }
    }
  }

  updateItem(item: Item){
    this.itemService.update(item).then(() => this.itemService.getItems()
      .then(items => this.items = items));
  }
}
