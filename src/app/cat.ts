import { Item }         from './item';
export class Cat {
  name: string;
  items: Item[] = [];
  constructor(name: string) {
    this.name = name;
  }

}
