export class Item {
  id: number;
  type: number;
  values: {};
  tagList: string[];
  links: number[];
  deleted: boolean;

  constructor(){
    this.values = {};
  }
}
