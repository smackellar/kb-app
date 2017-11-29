import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { DragService } from './drag.service';


@Directive({
  selector: '[myDropTarget]'
})
export class DropTargetDirective {
  constructor(private dragService: DragService) {
  }

  @Input()
  set myDropTarget(options: DropTargetOptions) {
    if (options) {
      this.options = options;
    }
  }

  @Output('myDrop') drop = new EventEmitter();

  private options: DropTargetOptions = {};

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    const { zone = 'zone' } = this.options;

    if (this.dragService.accepts(zone)) {
       event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
console.log(event.dataTransfer.getData('Text'));
    const data =  JSON.parse(event.dataTransfer.getData('Text'));
    console.log(data);
    this.drop.next(data);
  }
}
export interface DropTargetOptions {
  zone?: string;
}
