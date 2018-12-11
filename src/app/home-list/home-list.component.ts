import { Component, OnInit } from '@angular/core';
import { TypeDef } from '../type-def';
import { TypeDefService } from '../type-def.service';

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
    // load all definitions
    this.typeDefService.getTypeDefs().subscribe(typeDefs => {
        this.typeDefs = typeDefs;
      }
    );
  }

}
