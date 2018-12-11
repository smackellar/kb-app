import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { TypeDef } from '../type-def';
import { ItemService } from '../item.service';
import { DefCurrentService } from '../def-current.service';

@Component({
  selector: 'my-dashboard',
  template: '<h3>My Dashboard</h3>',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {

  items: Item[] = [];
  defSelect: TypeDef;

  constructor(
    private defCurrentService: DefCurrentService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => {
       if (def) {
         this.defSelect = def;
         this.loadItems();
       }
    });

    // get inserted items as they are added
    this.itemService.getSubject().subscribe(item => {
      if (item){
        console.log("received item");
        this.items.push(item);
      }
    });

  }

  private loadItems(): void {
    this.itemService.getItems(this.defSelect)
        .subscribe(items => {
          this.items = items;
        });
  }

}
