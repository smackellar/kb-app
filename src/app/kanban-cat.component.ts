import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { Item } from './item';
import { Cat } from './cat';
import { CatType } from './cat-type';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ItemService } from './item.service';

@Component({
  selector: 'cat',
  templateUrl: './kanban-cat.component.html',
  styleUrls: [ './kanban.component.css' ]
})

export class KanbanCat implements OnInit {

  @Input() items;
  @Input() cat : Cat;
  @Input() catTypeSelect;
  origCatName: string;
  catName: string;

  ngOnInit(): void {
    this.catName = this.cat.name;
    this.origCatName = this.catName;
  }

  constructor(private itemService: ItemService, private elementRef: ElementRef) {
    const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
        .map(() => this.catName)
        .debounceTime(500)
        .distinctUntilChanged();

    eventStream.subscribe(input => this.updateCat(input));
}

  updateCat(newCatName: string){
    console.log("update " + this.origCatName + " to " + newCatName);

    this.cat.name = newCatName;

    // FIX!!
    // // update category
    // this.catTypeSelect.cats[this.catTypeSelect.cats.indexOf(this.origCat)] = newCat;
    // // update items
    // for (let item of this.items){
    //   if (item[this.catTypeSelect.name] == this.origCat){
    //     item[this.catTypeSelect.name] = newCat;
    //   }
    // }

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

    // remove the cat - SHOULD BE IN CatType
    this.catTypeSelect.cats.splice(this.catTypeSelect.cats.indexOf(catToRemove),1);
  }

  onDrop(event : any, cat : Cat): void {
    // loop through items to find the one that needs to be updated
    for (let item of this.items){
      if (item.id == parseInt(event)){
        item[this.catTypeSelect.name] = cat.name;
        // keep category manager in sync
        this.catTypeSelect.refreshItem(item);
        // persist
        this.updateItem(item);
      }
    }
  }


  updateItem(item: Item){
    this.itemService.update(item).then(() => this.itemService.getItems()
      .then(items => this.items = items));
  }

}
