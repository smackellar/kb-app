
import { Component, OnInit, Input } from '@angular/core';
import { TypeDef } from './type-def';
import { TypeDefService } from './type-def.service';
import { ItemService } from './item.service';
import { DefCurrentService } from './def-current.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'def-creator',
  templateUrl: './def-creator.component.html'
})

export class DefCreatorComponent implements OnInit {

  @Input() def: TypeDef;
  fieldText: String;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private typeDefService: TypeDefService,
    private itemService: ItemService,
    private defCurrentService: DefCurrentService) { }

  ngOnInit(): void {
    this.def = new TypeDef();
    this.def.name = "TEST";
    this.def.fields=[];
  }

  createDef(){
    this.typeDefService.add(this.def).then(response => this.router.navigateByUrl("/" + this.def.id + "/def"));

  }

}
