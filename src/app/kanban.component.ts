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
  @Input() newCat: string = "";
  defSelect: TypeDef;
  listManager: ListableFieldManager;
  // listableValues: any[];
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
    // this.listableValues = this.listManager.listableValues;
  }

  addCat(): void {
    if (this.newCat.length == 0){
      console.log("Category is empty" + this.newCat);
      return;
    }
  }

  setField(): void {
    this.listManager = new ListableFieldManager(this.fieldSelect, this.items);
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

}
