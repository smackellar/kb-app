export class CatType {
  name: string;
  cats: string[] = [];
  constructor(name: string) {
    this.name = name;
  }
  addCat(cat: string){
    if(this.cats.indexOf(cat)<0){
      this.cats.push(cat);
    }
  }
}
