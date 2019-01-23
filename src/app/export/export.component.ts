import { Component, OnInit } from '@angular/core';
import { TypeDef } from '../type-defs/type-def';
import { Item } from '../items/item';
import { ItemService } from '../items/item.service'
import { DefCurrentService } from '../type-defs/def-current.service';
import { ItemUtils } from '../items/item-utils';
import { ExportService } from './export.service';
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
    private exportService: ExportService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemUtils = new ItemUtils();
    this.defCurrentService.getSubject().subscribe(def => {
       this.defSelect = def;
    });
  }

  doExport(){
    this.itemService.getItems(this.defSelect).subscribe(items => {
      saveAs(this.exportService.doExportItems(this.defSelect, items), this.defSelect.name + ".csv");
    });
  }

}
