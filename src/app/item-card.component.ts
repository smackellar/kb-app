import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }      from '@angular/core';
import { Location }               from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { Item }         from './item';
import { ItemService }  from './item.service';
@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: [ './item-card.component.css' ]
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  @Input() expand: boolean;
  editable: boolean = false;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private location: Location

  ) {
  }

  ngOnInit(): void {
    this.editable = this.route.snapshot.url[0].path!="detail";
  }

}
