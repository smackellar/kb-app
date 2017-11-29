import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }      from '@angular/core';
import { Location }               from '@angular/common';

import { Item }         from './item';
import { ItemService }  from './item.service';
@Component({
  selector: 'item-linker',
  templateUrl: './item-linker.component.html'
})
export class ItemLinkerComponent {
  @Input() item: Item;
    items: Item[] = [];

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemService.getItems()
          .then(items => this.items = items);
    }


    onSelectChange(linkId: string){
      console.log(this.item.id + " - " + linkId);
      this.itemService.addLink(this.item, parseInt(linkId));
      this.itemService.update(this.item);
    }
}
