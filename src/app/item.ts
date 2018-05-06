export class Item {
  id: number;
  type: number;
  values: {};
  private _tags: string;
  tagList: Array<string>;
  links: Array<number>;

  constructor(){
    this.values = {};
  }
}
