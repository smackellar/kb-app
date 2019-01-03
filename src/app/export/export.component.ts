import { Component, OnInit } from '@angular/core';
import { TypeDef } from '../type-defs/type-def';
import { Item } from '../items/item';
import { DefCurrentService } from '../type-defs/def-current.service';
import { ItemService } from '../items/item.service';
import { ItemUtils } from '../items/item-utils';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})

export class ExportComponent implements OnInit {

  defSelect: TypeDef;
  items: Item[];
  itemUtils: ItemUtils;

  constructor(
    private defCurrentService: DefCurrentService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemUtils = new ItemUtils();
    this.defCurrentService.getSubject().subscribe(def => {
       this.defSelect = def;
    });
  }

  doExport(){
    let header = this.defSelect.fields.map((field) => {return field.name;}).join(",");
    this.itemService.getItems(this.defSelect).subscribe(items => {
      let text = header + "\n" + items.map((item) => {
        let t = this.defSelect.fields.map((field) => {
          return this.itemUtils.getValueByField(item, field);
        }).join(",");
        return t;
      }).join("\n");
      // this.items = itemService.
      var blob = new Blob([text], {type: 'text/csv' })
      saveAs(blob, "myFile.csv");
    });
  }

}
