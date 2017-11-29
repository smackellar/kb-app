import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let items = [
      {id: 11, name: 'Mr. Nice', status: "Open", tags: ['one','two','three'], links: [20]},
      {id: 12, name: 'Narco', status: "Closed", tags: ['tits','arse','fanny'], links: [14,15]},
      {id: 13, name: 'Bombasto', status: "Open"},
      {id: 14, name: 'Celeritas', status: "Doing"},
      {id: 15, name: 'Magneta', status: "Closed"},
      {id: 16, name: 'RubberMan', status: "Open"},
      {id: 17, name: 'Dynama', status: "Open"},
      {id: 18, name: 'Dr IQ', status: "Doing"},
      {id: 19, name: 'Magma', status: "Doing"},
      {id: 20, name: 'Tornado', status: "Closed"}
    ];
    return {items};
  }
}
