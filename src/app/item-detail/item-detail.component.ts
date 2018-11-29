import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { Item }         from '../item';
import { TypeDef }  from '../type-def';
import { ItemService }  from '../item.service';
import { DefCurrentService }  from '../def-current.service';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  defSelect: TypeDef;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private defCurrentService: DefCurrentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.defSelect = this.defCurrentService.typeDef;

  const id = +this.route.snapshot.paramMap.get('id');
  this.itemService.getItem(id)
    .subscribe(item => this.item = item);

  }
  save(): void {
    this.itemService.update(this.item)
      .subscribe(() => this.goBack());
  }
  delete(): void {
    this.itemService.delete(this.item)
    .subscribe(() => this.location.back());

  }
  updateField(value, fieldId): void {
    console.log("===" + value);
    this.item.values[fieldId] = value;
  }
  goBack(): void {
    this.location.back();
  }

}
