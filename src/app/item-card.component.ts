import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }      from '@angular/core';
import { Location }               from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { TypeDef } from './type-def';
import { Item }         from './item';
import { ItemService }  from './item.service';
import { DefCurrentService }  from './def-current.service';


@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: [ './item-card.component.css' ]
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  @Input() expand: boolean;
  editable: boolean = false;
  @Input() defSelect: TypeDef;

  constructor(
    private itemService: ItemService,
    private defCurrentService: DefCurrentService,
    private route: ActivatedRoute,
    private location: Location

  ) {
  }

  ngOnInit(): void {
    this.editable = this.route.snapshot.url[0].path!="detail";
  }

}
