import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TypeDef } from '../type-def';
import { Item }         from '../item';

import { DefCurrentService }  from '../def-current.service';
import { ItemService }  from '../item.service';
import {
  trigger,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: [ './item-card.component.css' ],
  animations: [
  trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(500, style({opacity:1}))
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(500, style({opacity:0}))
    ])
  ])
]
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
    this.router.navigateByUrl('/home/' + this.defCurrentService.typeDef.id  + '/detail/' + this.item.id);
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
