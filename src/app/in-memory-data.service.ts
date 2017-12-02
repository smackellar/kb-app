import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let items = [
      {id: 11, name: 'Mr. Nice', status: "Open", colour: "Red", tags: ['one','two','three'], links: [20]},
      {id: 12, name: 'Narco', status: "Closed", colour: "Red", tags: ['tits','arse','fanny'], links: [14,15]},
      {id: 13, name: 'Bombasto', status: "Open", colour: "Amber"},
      {id: 14, name: 'Celeritas', status: "Doing", colour: "Amber"},
      {id: 15, name: 'Magneta', status: "Closed", colour: "Red"},
      {id: 16, name: 'RubberMan', status: "Open", colour: "Red"},
      {id: 17, name: 'Dynama', status: "Open", colour: "Green"},
      {id: 18, name: 'Dr IQ', status: "Doing", colour: "Red"},
      {id: 19, name: 'Magma', status: "Doing", colour: "Green"},
      {id: 20, name: 'Tornado', status: "Closed", colour: "Green"}
    ];
    return {items};
  }
}
