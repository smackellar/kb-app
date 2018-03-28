import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { Item } from './item';
import { ItemUtils } from './item-utils';
import { ListableFieldManager } from './listable-field-manager';
import { TypeDef } from './type-def';

import { Cat } from './cat';
// import { CatType } from './cat-type';
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

  @Input() val : any;
  @Input() defSelect: TypeDef;
  @Input() manager: ListableFieldManager;
  origVal: any;
  catName: string;
  listItems: Item[];
  itemUtils: ItemUtils;

  ngOnInit(): void {
    // this.catName = this.cat.name;
    this.origVal = this.val;
    console.log("*" + this.val);
    console.log("**" + this.manager);
    this.listItems = this.manager.getItemsByValue(this.val);
    console.log("***" + this.listItems.length);
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

  //   this.itemUtils = new ItemUtils();
  // console.log(this.items.length);
  //   for (let item of this.items){
  //     if (this.itemUtils.getValueByField(item, this.listManager.field) == this.val)
  //       this.listItems.push(item);
  //   }
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

  onDrop(event : any, cat : Cat): void {
    // loop through items to find the one that needs to be updated
    // for (let item of this.items){
    //   if (item.id == parseInt(event)){
    //     item[this.catTypeSelect.name] = cat.name;
    //     // keep category manager in sync
    //     this.catTypeSelect.refreshItem(item);
    //     // persist
    //     this.updateItem(item);
    //   }
    // }
  }

  updateItem(item: Item){
    // this.itemService.update(item).then(() => this.itemService.getItems(this.defCurrentService.typeDef)
    //   .then(items => this.items = items));
  }

}
