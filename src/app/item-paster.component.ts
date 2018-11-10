import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ItemService }  from './item.service';
import { TypeDef } from './type-def';
import { DefCurrentService } from './def-current.service';

@Component({
  selector: 'item-paster',
  templateUrl: './item-paster.component.html'
})

export class ItemPasterComponent implements OnInit {

  @Input() defSelect: TypeDef;
  private url: String;
  private itemText: String = "test";

  constructor(
    private defCurrentService: DefCurrentService,
    private itemService: ItemService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(url =>{
     this.url = url.toString();
    });
    this.defCurrentService.getSubject().subscribe(def => {
         this.defSelect = def;
    });

  }

  addItems(): void {
    console.log(this.itemText);
    let rows: String[] = this.itemText.split('\n');
    for (let rowText of rows){
      this.itemService.newItem(this.defSelect, rowText.split(','));
    }
  }

}
