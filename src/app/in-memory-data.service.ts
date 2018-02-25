import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let items = [
      {cat: 'other', id: 11, name: 'Mr. Nice', status: "Open", colour: "Red", tags: ['one','two','three'], links: [20]},
      {cat: 'other', id: 12, name: 'Narco', status: "Closed", colour: "Red", tags: ['tits','arse','fanny'], links: [14,15]},
      {cat: 'hero', id: 11, name: 'Mr. Nice', status: "Open", colour: "Red", tags: ['one','two','three'], links: [20]},
      {cat: 'hero', id: 12, name: 'Narco', status: "Closed", colour: "Red", tags: ['tits','arse','fanny'], links: [14,15]},
      {cat: 'hero', id: 13, name: 'Bombasto', status: "Open", colour: "Amber"},
      {cat: 'hero', id: 14, name: 'Celeritas', status: "Doing", colour: "Amber"},
      {cat: 'hero', id: 15, name: 'Magneta', status: "Closed", colour: "Red"},
      {cat: 'hero', id: 16, name: 'RubberMan', status: "Open", colour: "Red"},
      {cat: 'hero', id: 17, name: 'Dynama', status: "Open", colour: "Green"},
      {cat: 'hero', id: 18, name: 'Dr IQ', status: "Doing", colour: "Red"},
      {cat: 'hero', id: 19, name: 'Magma', status: "Doing", colour: "Green"},
      {cat: 'hero', id: 20, name: 'Tornado', status: "Closed", colour: "Green"}
    ];
    return {items};
  }
}
