import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'my-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: [ './kanban.component.css' ]
})

export class KanbanComponent implements OnInit {

  items: Item[] = [];
  x:string = 'arse';
  cats: string[] = ['Open','Closed','Doing'];
  private location: Location

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
      this.itemService.getItems()
        .then(items => this.items = items);
  }

  private addCat(status: string){
    if(this.cats.indexOf(status)<0){
      this.cats.push(status);
    }
  }

  onDrop(event : any, cat : string): void {
    for (let item of this.items){
      if (item.id == parseInt(event)){
        item.status = cat;
        this.updateItem(item);
      }
    }
  }

  updateItem(item: Item){
    this.itemService.update(item).then(() => this.itemService.getItems()
      .then(items => this.items = items));
  }
}
