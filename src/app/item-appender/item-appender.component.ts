import { Component, OnInit } from '@angular/core';
import { ItemService } from '../items/item.service';
import { TypeDef } from '../type-defs/type-def';
import { DefCurrentService } from '../type-defs/def-current.service';

@Component({
  selector: 'app-item-appender',
  templateUrl: './item-appender.component.html',
  styleUrls: ['./item-appender.component.css']
})

export class ItemAppenderComponent implements OnInit {

  defSelect: TypeDef;
  pasteMode: boolean;

  constructor(
    private defCurrentService: DefCurrentService,
    private itemService: ItemService) {
  }

  ngOnInit() {
    this.defCurrentService.getSubject().subscribe(def => {
       this.defSelect = def;
    });
  }

  addItem(): void {
    this.itemService.newItem(this.defSelect, null)
    .subscribe(item => {
      console.log("item added: " + item.id);
    });
  }

  pasteItemsToggle(): void {
    this.pasteMode = !this.pasteMode;
  }

}
