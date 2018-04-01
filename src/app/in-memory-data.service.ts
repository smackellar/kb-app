import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let items = [
      {type: 1, id: 1, values: {1: 'Mr. Nice',2: "Open", 3: "Red", 4:['one','two','three'], 5: [20]}},
      {type: 1, id: 2, values: {1: 'Narco', 2: "Closed", 3: "Amber", 4: ['tits','arse','fanny'], 5: [14,15]}},
      {type: 2, id: 11, values: {1: 'Narco', 2: "Closed", 3: "Red", 4: ['tits','arse','fanny'], 5: [14,15]}},
      {type: 2, id: 12, values: {1: 'Mr. Nice', 2: "Open", 3: "Red", 4: ['one','two','three'], 5: [20]}},
      {type: 2, id: 13, values: {1: 'xx', 2: "Open", 3: "Red"}},
      {type: 2, id: 14, values: {1: 'y', 2: "Doing", 3: "Red"}},
      {type: 2, id: 15, values: {1: 'xx yy zz', 2: "Open", 3: "Amber"}},
      {type: 2, id: 16, values: {1: 'Mr T', 2: "Open", 3: "Amber"}},
      {type: 2, id: 17, values: {1: 'Heidi', 2: "Open", 3: "Green"}},
      {type: 2, id: 18, values: {1: 'Elmer Fudd', 2: "Doing", 3: "Red"}},
      {type: 2, id: 19, values: {1: 'Plop', 2: "Doing", 3: "Amber"}},
      {type: 2, id: 20, values: {1: 'Hanky Poo', 2: "Open", 3: "Green"}}
    ];


    let typeDefs = [
      {id: 1, name: 'other', fields: [
        {id: 1, name: "name", isCardable: true},
        {id: 2, name: "status", isCardable: true, isListable: true},
        {id: 3, name: "colour", isCardable: true, isListable: true},
        {id: 4, name: "tags"}
      ]},
      {id: 2, name: 'hero', fields: [
        {id: 1, name: "name", isCardable: true},
        {id: 2, name: "status", isCardable: true, isListable: true},
        {id: 3, name: "colour", isCardable: true, isListable: true}
      ]}];

    return {items, typeDefs};
  }
}
