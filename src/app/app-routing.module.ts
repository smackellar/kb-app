import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { KanbanComponent }   from './kanban/kanban.component';
import { ItemDetailComponent }  from './item-detail/item-detail.component';
import { DefSelectorComponent }  from './def-selector/def-selector.component';
import { DefCreatorComponent }  from './def-creator/def-creator.component';
import { TypeDefViewComponent }  from './type-def-view/type-def-view.component';

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
