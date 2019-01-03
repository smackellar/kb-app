import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../items/item';
import { TypeDef } from '../type-defs/type-def';
import { FieldDef } from '../fields/field-def';
import { ListValItems }         from '../items/list-val-items';

import { ListableFieldManager } from '../fields/listable-field-manager';
import { ItemService } from '../items/item.service';
import { DefCurrentService } from '../type-defs/def-current.service';

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
  addCatMode: boolean;

  constructor(
    private defCurrentService: DefCurrentService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => {
      console.log("def event");
       if (def) {
         this.defSelect = def;
         this.initItems();
         for (let field of this.defSelect.fields){
           if (field.isListable)
            this.fieldSelect = field;
         }
       }
    });

    // get inserted items
    this.itemService.getSubject().subscribe(item => {
      if (item && this.listManager){
        this.listManager.refreshItem(item);
      }
    });
  }

  initItems(){
    console.log("initItems");
    this.itemService.getItems(this.defSelect)
        .subscribe(items => this.initItemsForDef(items, this.defSelect));
  }

  private initItemsForDef(items: Item[], def: TypeDef){
    this.items = items;

    // first find a field (will break if none)
    if (!this.fieldSelect || !this.fieldSelect.isListable){
      this.fieldSelect = def.fields.filter(f => f.isListable)[0];
    }
    this.setField();
  }

  setField(): void {
    this.listManager = new ListableFieldManager(this.itemService, this.fieldSelect, this.items);
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
  addList(): void {
    if (this.newList.length == 0){
      console.log("List name is blank");
      return;
    }
    this.listManager.getList(this.newList);
    this.newList = ""; // reset input field
    this.toggleAddCat();
  }
  toggleAddCat(): void{
    this.addCatMode = !this.addCatMode;
  }

}
