export class Item {
  id: number;
  type: number;
  values: {};
  tagList: string[];
  links: number[];
  deleted: boolean = false;

  constructor(){
    this.values = {};
  }
}
