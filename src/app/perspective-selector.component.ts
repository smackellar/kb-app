import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'perspective-selector',
  templateUrl: './perspective-selector.component.html'
})

export class PerspectiveSelectorComponent implements OnInit {

  private url: String;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(url =>{
     this.url = url.toString();
    });
  }

}
