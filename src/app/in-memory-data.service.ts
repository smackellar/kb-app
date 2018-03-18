import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let items = [
      {type: 1, id: 11, values: [1,'Mr. Nice', "Open", "Red", ['one','two','three'], [20]]},
      {type: 1, id: 12, values: [2,'Narco', "Closed", "Amber", ['tits','arse','fanny'], [14,15]]},
      {type: 2, id: 11, values: [1,'Narco', "Closed", "Red", ['tits','arse','fanny'], [14,15]]},
      {type: 2, id: 12, values: [2,'Mr. Nice', "Open", "Red", ['one','two','three'], [20]]},
      {type: 2, id: 13, values: [3,'xx', "Open", "Red"]},
      {type: 2, id: 14, values: [4,'y', "Doing", "Red"]},
      {type: 2, id: 15, values: [5,'xx yy zz', "Open", "Amber"]},
      {type: 2, id: 16, values: [6,'Mr T', "Open", "Amber"]},
      {type: 2, id: 17, values: [7,'Heidi', "Open", "Green"]},
      {type: 2, id: 18, values: [8,'Elmer Fudd', "Doing", "Red"]},
      {type: 2, id: 19, values: [9,'Plop', "Doing", "Amber"]},
      {type: 2, id: 20, values: [10,'Hanky Poo', "Open", "Green"]}
    ];


    let typeDefs = [
      {id: 1, name: 'other', fields: [
        {id: 1, name: "name", isListable: true},
        {id: 2, name: "status", isListable: true},
        {id: 3, name: "colour"},
        {id: 4, name: "tags"}
      ]},
      {id: 2, name: 'hero', fields: [
        {id: 1, name: "name", isListable: true},
        {id: 2, name: "status", isListable: true},
        {id: 3, name: "colour"}
      ]}];

    return {items, typeDefs};
  }
}
