import { Component, OnInit, Input } from '@angular/core';
import { TypeDef } from '../type-defs/type-def';
import { TypeDefService } from '../type-defs/type-def.service';
import { DefCurrentService } from '../type-defs/def-current.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  configMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private typeDefService: TypeDefService,
    private defCurrentService: DefCurrentService) {
    }

  ngOnInit(): void {
    // load all definitions
    this.typeDefService.getTypeDefs().subscribe(typeDefs => {
        this.typeDefs = typeDefs; // this will stay up to date
        this.checkConfigMode();
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
    this.router.events.subscribe(() => {
      // might be a more efficient way to do this as gets fired several times
      this.checkConfigMode();
    });
  }

  private checkConfigMode(): void {
    this.configMode = this.router.url.indexOf("config")>-1;
  }

  addDef(): void {
    let typeDef = new TypeDef();
    typeDef.name = "New Def";
    this.typeDefService.add(typeDef).subscribe(() => {
      // console.log("New def returned: " + typeDef.id);
      // this.typeDefs.push(typeDef); // shouldn't need this
      // switch currently selected
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
