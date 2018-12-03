import { Component, OnInit, Input } from '@angular/core';
import { ItemService }  from '../item.service';
import { TypeDef } from '../type-def';
import { DefCurrentService } from '../def-current.service';
import { TypeDefService } from '../type-def.service';

@Component({
  selector: 'item-paster',
  templateUrl: './item-paster.component.html'
})

export class ItemPasterComponent implements OnInit {

  @Input() defSelect: TypeDef;
  private itemText: string = "";
  @Input() private updateFieldsMode: boolean;

  constructor(
    private defCurrentService: DefCurrentService,
    private typeDefService: TypeDefService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.defCurrentService.getSubject().subscribe(def => {
         this.defSelect = def;
    });
  }

  // optional
  addFields(): void {
    let rows: string[] = this.itemText.split('\n');
    if (rows.length == 0){
      console.log("No rows available to update fields");
      return;
    }

    let fieldIndex: number = 0;
    for (let fieldText of rows[0].split(',')){
      // if the field doesn't exist add it
      if (fieldIndex >= this.defSelect.fields.length){
        this.typeDefService.addField(this.defSelect, fieldText);
      }
      else {
        this.defSelect.fields[fieldIndex].name = fieldText;
      }

      fieldIndex++;
    }
    // update the type
    this.typeDefService.update(this.defSelect).subscribe(() => {
      console.log("type updated");
    });
  }


  addItems(): void {
    if (this.updateFieldsMode){
      this.addFields();
    }
    console.log(this.itemText);
    let rows: string[] = this.itemText.split('\n');
    for (let rowText of rows){
      // skip first row if used to drive field names
      if (this.updateFieldsMode && rows[0] == rowText)
        continue;
      this.itemService.newItem(this.defSelect, rowText.split(','))
      .subscribe(() => {
        this.itemText = "";
      });
    }

  }

}
