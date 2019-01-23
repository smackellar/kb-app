import { Injectable } from '@angular/core';
import { TypeDef } from '../type-defs/type-def'
import { ItemUtils } from '../items/item-utils';
import { Item } from '../items/item';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  itemUtils: ItemUtils;

  constructor(
  ) {
    this.itemUtils = new ItemUtils();
  }

  doExportItems(defSelect: TypeDef, items: Item[]): Blob {
      let header = defSelect.fields.map((field) => {return field.name;}).join(",");
      let text = header + "\n" + items.map((item) => {
        let t = defSelect.fields.map((field) => {
          return this.itemUtils.getValueByField(item, field);
        }).join(",");
        return t;
      }).join("\n");

      var blob = new Blob([text], {type: 'text/csv' })
      return blob
  }

}
