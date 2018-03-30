import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';

import { Item } from './item';
import { ListValItems } from './list-val-items';
import { ItemUtils } from './item-utils';
import { ListableFieldManager } from './listable-field-manager';
import { TypeDef } from './type-def';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ItemService } from './item.service';
import { DefCurrentService } from './def-current.service';

@Component({
  selector: 'kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: [ './kanban.component.css' ]
})

export class KanbanListComponent implements OnInit {

  // @Input() val : any;
  @Input() list: ListValItems;
  @Input() defSelect: TypeDef;
  @Input() manager: ListableFieldManager;
  @Output() listUpdater: EventEmitter <Item> = new EventEmitter();
  origVal: any;
  catName: string;
  // listItems: Item[];
  itemUtils: ItemUtils;

  ngOnInit(): void {
    this.origVal = this.list.value;
  }

  constructor(
    private itemService: ItemService,
    private defCurrentService: DefCurrentService,
    private elementRef: ElementRef
  ) {

    const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
        .map(() => this.catName)
        .debounceTime(500)
        .distinctUntilChanged();

    eventStream.subscribe(input => this.updateCat(input));
  }

  updateCat(newCatName: string){
    // console.log("update " + this.origCatName + " to " + newCatName);
    //
    // this.cat.name = newCatName;
    //
    // // update items
    // for (let item of this.cat.items){
    //   item[this.catTypeSelect.name] = this.cat.name;
    // }
  }

  removeCat(catToRemove: string): void {
    console.log("Remove cat: " + catToRemove);
    // check at least one cat
    // if (this.catTypeSelect.cats.length == 1){
    //   console.log("Last remaining cat - do not remove");
    //   return;
    // }
    //
    // this.catTypeSelect.cats.splice(this.catTypeSelect.cats.indexOf(catToRemove),1);
  }

  onDrop(event : any, value : any): void {
    console.log("item to update: " + event.values[this.manager.field.id] + " to " + value);
    event.values[this.manager.field.id] = value;
    console.log("updated item: " + event);
    // update item and tell the parent
    this.updateItem(event);
    this.listUpdater.emit(event);
  }

  updateItem(item: Item){
    this.itemService.update(item)
      .then(() => this.itemService.getItems(this.defCurrentService.typeDef)
        // .then(items => this.manager.setItems(items))
      );
  }

}
