import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }      from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TypeDef } from '../type-def';
import { Item }         from '../item';
import { DefCurrentService }  from '../def-current.service';


@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: [ './item-card.component.css' ]
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  @Input() expand: boolean;
  editable: boolean = false;
  defSelect: TypeDef;

  constructor(
    private defCurrentService: DefCurrentService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.editable = this.route.snapshot.url[0].path!="detail";
    this.defSelect = this.defCurrentService.typeDef;
  }

}
