import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component'
import { KanbanComponent } from './kanban.component'
import { KanbanCat } from './kanban-cat.component'
import { ItemDetailComponent }  from './item-detail.component';
import { ItemCardComponent }  from './item-card.component';
import { ItemLinkerComponent }  from './item-linker.component';

import { AppRoutingModule }     from './app-routing.module';

import { ItemService } from './item.service'
import { DragService } from './drag.service';

import { DraggableDirective } from './draggable.directive';
import { DropTargetDirective } from './drop-target.directive';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ItemDetailComponent,
    ItemCardComponent,
    ItemLinkerComponent,
    DashboardComponent,
    KanbanComponent,
    KanbanCat,
    DraggableDirective, DropTargetDirective
  ],
  providers: [ ItemService, DragService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
