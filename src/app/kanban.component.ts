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
  // @Input() catTypeSelectName: string = this.catTypes[0].name;
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

  private findUniqueCatName(name: string): string {
    var suffixCount = 0;
    while(this.catTypeSelect.cats.indexOf(suffixCount == 0 ? name : name + " (" + suffixCount + ")") > 0){
      suffixCount++;
      console.log(name + " (" + suffixCount + ")");
    }
    return suffixCount == 0 ? name : name + " (" + suffixCount + ")";
  }

  addCat(): void {
    console.log("New cat: " + this.newCat);
    if (this.newCat.length == 0) {
      this.newCat = "New " + this.catTypeSelect.name;
    }
    this.catTypeSelect.cats.push(this.findUniqueCatName(this.newCat));
    this.newCat = "";
  }

  removeCat(catToRemove: string): void {
    console.log("Remove cat: " + catToRemove);
    // check at least one cat
    if (this.catTypeSelect.cats.length == 1){
      console.log("Last remaining cat - do not remove");
      return;
    }

    // update items to first cat
    for (let item of this.items){
      if (item[this.catTypeSelect.name] == catToRemove){
        item[this.catTypeSelect.name] = (this.catTypeSelect.cats[0] == item[this.catTypeSelect.name] ? this.catTypeSelect.cats[1] : this.catTypeSelect.cats[0]);
        this.updateItem(item);
      }
    }

    // remove the cat
    this.catTypeSelect.cats.splice(this.catTypeSelect.cats.indexOf(catToRemove),1);
  }

  onDrop(event : any, cat : string): void {
    // loop through items to find the one that needs to be updated
    for (let item of this.items){
      if (item.id == parseInt(event)){
        item[this.catTypeSelect.name] = cat;
        console.log(item[this.catTypeSelect.name]);
        this.updateItem(item);
      }
    }
  }

  updateItem(item: Item){
    this.itemService.update(item).then(() => this.itemService.getItems()
      .then(items => this.items = items));
  }
}
