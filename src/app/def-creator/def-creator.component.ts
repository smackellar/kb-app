
import { Component, OnInit, Input } from '@angular/core';
import { TypeDef } from '../type-defs/type-def';
import { TypeDefService } from '../type-defs/type-def.service';
import { Router } from '@angular/router';

@Component({
  selector: 'def-creator',
  templateUrl: './def-creator.component.html'
})

export class DefCreatorComponent implements OnInit {

  @Input() def: TypeDef;


  constructor(
    private router: Router,
    private typeDefService: TypeDefService) { }

  ngOnInit(): void {
    this.def = new TypeDef();
    this.def.name = "TEST";
    this.def.fields=[];
  }

  createDef(){
    this.typeDefService.add(this.def).subscribe(() => this.router.navigateByUrl("/" + this.def.id + "/def"));

  }

}
