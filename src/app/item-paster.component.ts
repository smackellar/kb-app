import { Component, OnInit, Input } from '@angular/core';
import { ItemService }  from './item.service';
import { TypeDef } from './type-def';
import { DefCurrentService } from './def-current.service';

@Component({
  selector: 'item-paster',
  templateUrl: './item-paster.component.html'
})

export class ItemPasterComponent implements OnInit {

  @Input() defSelect: TypeDef;
  private itemText: string = "test";

  constructor(
    private defCurrentService: DefCurrentService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => {
         this.defSelect = def;
    });
  }


  addItems(): void {
    console.log(this.itemText);
    let rows: string[] = this.itemText.split('\n');
    for (let rowText of rows){
      this.itemService.newItem(this.defSelect, rowText.split(','))
      .subscribe(item => {console.log("item added: " + item.id)});
    }
  }

}
