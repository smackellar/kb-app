import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DefSelectorComponent } from './def-selector.component';
import { PerspectiveSelectorComponent } from './perspective-selector.component';
import { DashboardComponent } from './dashboard.component'
import { KanbanComponent } from './kanban.component'
import { KanbanListComponent } from './kanban-list.component'
import { ItemDetailComponent }  from './item-detail.component';
import { ItemCardComponent }  from './item-card.component';
import { ItemLinkerComponent }  from './item-linker.component';
import { TypeDefViewComponent } from './type-def-view.component';
import { FieldListablePipe } from './field-listable.pipe';

import { AppRoutingModule }     from './app-routing.module';

import { ItemService } from './item.service'
import { DragService } from './drag.service';
import { TypeDefService } from './type-def.service';
import { DefCurrentService } from './def-current.service';

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
    PerspectiveSelectorComponent,
    DefSelectorComponent,
    DashboardComponent,
    KanbanComponent,
    ItemDetailComponent,
    ItemCardComponent,
    ItemLinkerComponent,
    TypeDefViewComponent,
    KanbanListComponent,
    DraggableDirective,
    DropTargetDirective,
    FieldListablePipe
  ],
  providers: [ ItemService, DragService, TypeDefService, DefCurrentService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
