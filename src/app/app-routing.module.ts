import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { KanbanComponent }   from './kanban.component';
import { ItemDetailComponent }  from './item-detail.component';
import { DefSelectorComponent }  from './def-selector.component';

const routes: Routes = [
  {path: ':defType',
    component: DefSelectorComponent,
    children: [
      { path: 'detail/:id', component: ItemDetailComponent },
      { path: 'dashboard',  component: DashboardComponent },
      { path: 'kanban',  component: KanbanComponent }
    ]
  }];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
