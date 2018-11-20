import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from './item';
import { ListValItems } from './list-val-items';
import { ItemUtils } from './item-utils';
import { ListableFieldManager } from './listable-field-manager';
import { TypeDef } from './type-def';

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
  listName: string;
  itemUtils: ItemUtils;
  origListValue: any;

  ngOnInit(): void {
    this.initListName();
  }

  constructor(
    private itemService: ItemService,
    private defCurrentService: DefCurrentService
  ) {};

  private updateCat(newCatName: string){
    console.log("update " + this.list.value + " to " + newCatName);
    this.manager.updateListName(this.list.value, newCatName);
    this.initListName();
  }
  private initListName(){
    this.listName = this.list.value;
  }

  onListNameEnter(){
    this.updateCat(this.listName);
  }

  removeList(list: ListValItems): void {
    // check at least one cat
    if (this.manager.lists.length == 1){
      console.log("Last remaining list - do not remove");
      return;
    }
    console.log("Remove list: " + list.value);
    this.manager.removeList(list);
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
      .subscribe(() => this.itemService.getItems(this.defCurrentService.typeDef)
        // .then(items => this.manager.setItems(items))
      );
  }

}
