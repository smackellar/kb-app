import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { KanbanComponent }   from './kanban.component';
import { ItemDetailComponent }  from './item-detail.component';
import { DefSelectorComponent }  from './def-selector.component';
import { DefCreatorComponent }  from './def-creator.component';
import { TypeDefViewComponent }  from './type-def-view.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home',
    component: DefSelectorComponent,
    children: [
      { path: 'new', component: DefCreatorComponent },
    ]
  },
  { path: ':defType',
    component: DefSelectorComponent,
    children: [
      { path: 'detail/:id', component: ItemDetailComponent },
      { path: 'def',  component: TypeDefViewComponent },
      { path: 'dashboard',  component: DashboardComponent },
      { path: 'kanban',  component: KanbanComponent }
    ]
  }];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
