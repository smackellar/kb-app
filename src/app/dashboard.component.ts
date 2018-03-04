import { Component, OnInit } from '@angular/core';

import { Item } from './item';
import { ItemService } from './item.service';
import { DefCurrentService } from './def-current.service';

@Component({
  selector: 'my-dashboard',
  template: '<h3>My Dashboard</h3>',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {

  items: Item[] = [];

  constructor(
    private defCurrentService: DefCurrentService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => {
       if (def) {
         console.log("from subscription: " + def.name);
         this.itemService.getItems(def)
             .then(items => (this.items = items));
       }
    });
  }

}
