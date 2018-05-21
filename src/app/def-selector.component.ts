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
  editMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private typeDefService: TypeDefService,
    private itemService: ItemService,
    private defCurrentService: DefCurrentService) { }

  ngOnInit(): void {
    this.initTypeDefs();
  }

  private initTypeDefs(): void{
    this.typeDefService.getTypeDefs()
      .then(typeDefs => {
        console.log("Getting types: " + typeDefs.length);
        this.typeDefs = typeDefs;
        if (!this.defSelect){
          let defId = this.route.snapshot.params['defType'];
          if (defId){
            this.defSelect = this.typeDefs.find(def => (def.id == defId));
          }
          // if (!this.defSelect){
          //   this.defSelect = this.typeDefs[0];
          // }
        }
        if (this.defSelect)
          this.updateDefSelect();
      }
    );
  }

  setDefSelect(defSelect: TypeDef): void {
    // use the current def service
    this.defSelect = defSelect;
    this.updateDefSelect();
  }
  updateDefSelect(): void {
    // use the current def service
    this.defCurrentService.typeDef = this.defSelect;
    this.router.navigateByUrl("/" + this.defSelect.id + "/" + (this.route.snapshot.url.toString().indexOf("kanban") ? "kanban" : "dashboard" ));
  }

  addDef(): void {
    this.typeDefService.add("New def").then(typeDef => {
      console.log("New def returned: " + typeDef.id);
      // this.initTypeDefs();
      this.typeDefs.push(typeDef);
    });
    // this.ngOnInit(); // will have timing issues
  }

  removeDefSelect(): void {
    this.typeDefService.delete(this.defSelect)
    .then(() => {
      console.log("Deleted: " + this.defSelect.name);
      // this.defSelect = undefined;
      this.router.navigateByUrl("/defs");
    });
  }

  addItem(): void {
    this.itemService.newItem(this.defSelect)
    .then(item => (this.router.navigateByUrl("/" + this.defSelect.id + "/detail/" + item.id)));
  }

  updateName(name): void {
    this.defSelect.name = name;
    this.typeDefService.update(this.defSelect).then(typeDef => {

    });
  }

}
