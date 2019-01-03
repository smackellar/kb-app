import { Component, OnInit } from '@angular/core';
import { TypeDef } from '../type-defs/type-def';
import { TypeDefService } from '../type-defs/type-def.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  typeDefs: TypeDef[] = [];

  constructor(
    private typeDefService: TypeDefService) {
  }

  ngOnInit() {
    this.loadDefs();
  }

  deleteDef(def: TypeDef) {
    this.typeDefService.delete(def).subscribe(() => {
        this.loadDefs();
      }
    );
  }

  loadDefs() {
    // load all definitions
    this.typeDefService.getTypeDefs().subscribe(typeDefs => {
        this.typeDefs = typeDefs;
      }
    );
  }

}
