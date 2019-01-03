import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon',
  template: `<span class="oi oi-{{name}} small" title="{{title ? title : name}}" aria-hidden="true"></span>`
})
export class IconDirective {
  @Input() name: string;
  @Input() title: string;
}
