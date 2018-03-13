import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let items = [
      {type: 'other', id: 11, name: 'Mr. Nice', status: "Open", colour: "Red", tags: ['one','two','three'], links: [20]},
      {type: 'other', id: 12, name: 'Narco', status: "Closed", colour: "Red", tags: ['tits','arse','fanny'], links: [14,15]},
      {type: 'hero', id: 11, name: 'Mr. Nice', status: "Open", colour: "Red", tags: ['one','two','three'], links: [20]},
      {type: 'hero', id: 12, name: 'Narco', status: "Closed", colour: "Red", tags: ['tits','arse','fanny'], links: [14,15]},
      {type: 'hero', id: 13, name: 'Bombasto', status: "Open", colour: "Amber"},
      {type: 'hero', id: 14, name: 'Celeritas', status: "Doing", colour: "Amber"},
      {type: 'hero', id: 15, name: 'Magneta', status: "Closed", colour: "Red"},
      {type: 'hero', id: 16, name: 'RubberMan', status: "Open", colour: "Red"},
      {type: 'hero', id: 17, name: 'Dynama', status: "Open", colour: "Green"},
      {type: 'hero', id: 18, name: 'Dr IQ', status: "Doing", colour: "Red"},
      {type: 'hero', id: 19, name: 'Magma', status: "Doing", colour: "Green"},
      {type: 'hero', id: 20, name: 'Tornado', status: "Closed", colour: "Green"}
    ];

    let typeDefs = [
      {id: 1, name: 'other', catTypes: ["status"], fields: ["id", "name", "status", "colour", "tags"]},
      {id: 2, name: 'hero', catTypes: ["colour", "status"], fields: ["id", "name", "status", "colour", "tags"]}
    ];
    return {items, typeDefs};
  }
}
