import { Component, OnInit, Input } from '@angular/core';
import { TypeDef } from './type-def';
import { TypeDefService } from './type-def.service';
import { ItemService } from './item.service';
import { DefCurrentService } from './def-current.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'def-selector',
  templateUrl: './def-selector.component.html'
})

export class DefSelectorComponent implements OnInit {

  typeDefs: TypeDef[] = [];
  @Input() defSelect: TypeDef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private typeDefService: TypeDefService,
    private itemService: ItemService,
    private defCurrentService: DefCurrentService) { }

  ngOnInit(): void {
    console.log(this);
    this.typeDefService.getTypeDefs()
      .then(typeDefs => this.setTypeDefs(typeDefs));
  }

  private setTypeDefs(typeDefs: TypeDef[]): void{
    this.typeDefs = typeDefs
    this.defSelect = this.typeDefs.find(def => (def.id = this.route.snapshot.params['defType']));
    console.log("defType = " + this.route.snapshot.params['defType']);
    console.log("current = " + this.defSelect.name);
  }

  updateDefSelect(): void {
    this.itemService.setDefSelect(this.defSelect.name);
    // use the current def service
    this.defCurrentService.typeDef = this.defSelect;
    this.router.navigateByUrl("/" + this.defSelect.id + "/" + (this.route.snapshot.url.toString().indexOf("kanban") ? "kanban" : "dashboard" ));
  }

}
