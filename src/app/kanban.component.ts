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
  @Input() catTypeSelect: CatType = this.catTypes[0];
  @Input() catTypeSelectName: string = this.catTypes[0].name;
  @Input() newCat: string = "";

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
    for (let item of this.items){
      for (let catType of this.catTypes){
        catType.addCat(item[catType.name]);
      }
    }
  }

  private setCatTypeSelect(catTypeName: string): void {
    for (let catType of this.catTypes){
      if (catType.name == catTypeName){
        this.catTypeSelect = catType;
        this.catTypeSelectName = this.catTypeSelect.name;
      }
    }
  }


  updateCatType(newCatSelect: string): void {
    console.log(newCatSelect);
    console.log(this.catTypeSelectName);
    console.log("changing:" + this.catTypeSelectName + " to " + newCatSelect);
    this.setCatTypeSelect(newCatSelect);
  }

  addCat(): void {
    console.log("New cat: " + this.newCat);
    if (this.newCat.length > 0 && this.catTypeSelect.cats.indexOf(this.newCat) < 0){
      this.catTypeSelect.cats.push(this.newCat);
      this.newCat = "";
    }
  }

  onDrop(event : any, cat : string): void {
    // loop through items to find the one that needs to be updated
    for (let item of this.items){
      if (item.id == parseInt(event)){
        item[this.catTypeSelectName] = cat;
        console.log(item[this.catTypeSelectName]);
        this.updateItem(item);
      }
    }
  }

  updateItem(item: Item){
    this.itemService.update(item).then(() => this.itemService.getItems()
      .then(items => this.items = items));
  }
}
