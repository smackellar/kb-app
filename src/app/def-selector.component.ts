import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from './item.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'def-selector',
  templateUrl: './def-selector.component.html'
})

export class DefSelectorComponent implements OnInit {

  defs: string[] = ["hero","other"];
  @Input() defSelect: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService) { }

  ngOnInit(): void {
     console.log(this.route.snapshot.params['defType']);
     this.defSelect = this.route.snapshot.params['defType'];
     this.itemService.setDefSelect(this.defSelect);
  }

  updateDefSelect(): void {
    this.router.navigate([this.defSelect]);
  }

}
