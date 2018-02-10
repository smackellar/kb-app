import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { Item } from './item';
import { CatType } from './cat-type';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'cat',
  templateUrl: './kanban-cat.component.html'
})

export class KanbanCat implements OnInit {

  @Input() items;
  @Input() cat;
  @Input() catTypeSelect;
  origCat: string;
  ngOnInit(): void {
    this.origCat = this.cat;
  }

  constructor(private elementRef: ElementRef) {
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

}
