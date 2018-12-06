import { Component, OnInit, Input } from '@angular/core';
import { TypeDef } from '../type-def';
import { TypeDefService } from '../type-def.service';
import { DefCurrentService } from '../def-current.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'def-selector',
  templateUrl: './def-selector.component.html'
})

export class DefSelectorComponent implements OnInit {

  typeDefs: TypeDef[] = [];
  @Input() defSelect: TypeDef;
  editMode: boolean = false;
  path: string

  constructor(
    private route: ActivatedRoute,
    private typeDefService: TypeDefService,
    private defCurrentService: DefCurrentService) {
    }

  ngOnInit(): void {
    // load all definitions
    this.typeDefService.getTypeDefs().subscribe(typeDefs => {
        this.typeDefs = typeDefs;
      }
    );
    // get selected def from param
    this.route.paramMap.subscribe(map => {
      let defId: number = +map.get("defId");
      if (defId){
        this.typeDefService.getTypeDef(defId).subscribe(typeDef => {
          this.defSelect = typeDef;
          this.defCurrentService.typeDef = this.defSelect;
        });
      }
    });
  }

  addDef(): void {
    let typeDef = new TypeDef()
    typeDef.name = "New Def";
    this.typeDefService.add(typeDef).subscribe(typeDef => {
      console.log("New def returned: " + typeDef.id);
      this.typeDefs.push(typeDef);
      this.defSelect = typeDef;
      this.defCurrentService.typeDef = this.defSelect;
    });
  }

  updateName(name): void {
    this.defSelect.name = name;
    this.typeDefService.update(this.defSelect).subscribe(() => {
      console.log("updated current def name to: " + name);
    });
  }

}
