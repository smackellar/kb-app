export class Item {
  id: number;
  name: string;
  private _tags: string;
  tagList: Array<string>;
  links: Array<number>;
  status: string;


    // get tags(){
    //   console.log("TEST");
    //   return this._tags;
    // }
    //
    // set tags(newTags : string){
    //   console.log(newTags);
    //   this._tags = newTags;
    // }

    // getLinkList(): Array<String> {
    //   if (this._tags){
    //     return this._tags.split(',').filter(tag => tag.indexOf('link:') > -1).map(tag => tag.substr(5));
    //   }
    //   return new Array<String>();
    // }

}
