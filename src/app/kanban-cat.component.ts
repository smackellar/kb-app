import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { Item } from './item';
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
  @Input() cat;
  @Input() catTypeSelect;
  origCat: string;
  ngOnInit(): void {
    this.origCat = this.cat;
  }

  constructor(private itemService: ItemService, private elementRef: ElementRef) {
    const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
        .map(() => this.cat)
        .debounceTime(500)
        .distinctUntilChanged();

    eventStream.subscribe(input => this.updateCat(input));
}

  updateCat(newCat: string){
    console.log("update " + this.origCat + " to " + newCat);

    // update category
    this.catTypeSelect.cats[this.catTypeSelect.cats.indexOf(this.origCat)] = newCat;
    // update items
    for (let item of this.items){
      if (item[this.catTypeSelect.name] == this.origCat){
        item[this.catTypeSelect.name] = newCat;
      }
    }

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
