import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TypeDef } from '../type-def';
import { Item }         from '../item';

import { DefCurrentService }  from '../def-current.service';
import { ItemService }  from '../item.service';


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
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.editable = this.route.snapshot.url[0].path!="detail";
    this.defSelect = this.defCurrentService.typeDef;
  }

  edit(): void {
    this.router.navigateByUrl('/' + this.defCurrentService.typeDef.id  + '/detail/' + this.item.id);
  }

  delete(): void {
    this.itemService.delete(this.item)
    .subscribe(() => {});
  }

  undelete(): void {
    this.itemService.undelete(this.item)
    .subscribe(() => {});
  }

}
