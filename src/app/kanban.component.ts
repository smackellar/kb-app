import { Component, OnInit, Input } from '@angular/core';

import { Item } from './item';
import { TypeDef } from './type-def';
import { FieldDef } from './field-def';
import { ListValItems }         from './list-val-items';

import { ListableFieldManager } from './listable-field-manager';
import { ItemService } from './item.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DefCurrentService } from './def-current.service';

@Component({
  selector: 'my-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: [ './kanban.component.css' ]
})

export class KanbanComponent implements OnInit {

  items: Item[] = [];
  @Input() fieldSelect: FieldDef;
  @Input() newList: string = "";
  defSelect: TypeDef;
  listManager: ListableFieldManager;
  lists: ListValItems[];

  constructor(
    private route: ActivatedRoute,
    private defCurrentService: DefCurrentService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => {
       if (def) {
         console.log("from subscription: " + def.name);
         this.defSelect = def;
         this.initItems();
       }
    });
    this.fieldSelect = this.defCurrentService.getFieldDef();
  }

  initItems(){
    this.itemService.getItems(this.defSelect)
        .then(items => this.initItemsForDef(items, this.defSelect));
  }

  private initItemsForDef(items: Item[], def: TypeDef){
    this.items = items;

    // first find a field (will break if none)
    if (!this.fieldSelect){
      this.fieldSelect = def.fields.filter(f => f.isListable)[0];
    }
    this.setField();
  }

  setField(): void {
    this.listManager = new ListableFieldManager(this.itemService, this.fieldSelect, this.items);
    this.defCurrentService.setFieldDef(this.fieldSelect);
    this.getLists();
  }

  getLists(): void {
    this.lists = this.listManager.lists;
  }

  updateList(item: Item): void {
    console.log("UPDATE LIST EVENT");
    this.listManager.refreshItem(item);
    //this.initItems();
    this.getLists();
  }
  addList(value: any): void {
    if (this.newList.length == 0){
      console.log("List name is blank");
      return;
    }
    this.listManager.addList(this.newList);
    this.newList = ""; // reset input field
  }

}
