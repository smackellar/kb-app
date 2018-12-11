import { Component, OnInit, Input } from '@angular/core';
import { TypeDef } from '../type-def';
import { TypeDefService } from '../type-def.service';
import { DefCurrentService } from '../def-current.service';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'def-selector',
  templateUrl: './def-selector.component.html',
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
      else {
        console.log("Home");
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
