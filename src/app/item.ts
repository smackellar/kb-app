export class Item {
  id: number;
  name: string;
  private _tags: string;
  tagList: Array<string>;
  links: Array<number>;
  status: string;
}
