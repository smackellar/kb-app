import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { DefSelectorComponent } from './def-selector/def-selector.component';
import { DefCreatorComponent } from './def-creator/def-creator.component';
import { PerspectiveSelectorComponent } from './perspective-selector/perspective-selector.component';
import { ItemPasterComponent } from './item-paster/item-paster.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { KanbanComponent } from './kanban/kanban.component'
import { KanbanListComponent } from './kanban-list/kanban-list.component'
import { ItemDetailComponent }  from './item-detail/item-detail.component';
import { ItemCardComponent }  from './item-card/item-card.component';
import { TypeDefViewComponent } from './type-def-view/type-def-view.component';
import { FieldListablePipe } from './field-listable.pipe';

import { AppRoutingModule }     from './app-routing.module';

import { ItemService } from './item.service'
import { DragService } from './drag.service';
import { TypeDefService } from './type-def.service';
import { DefCurrentService } from './def-current.service';

import { DraggableDirective } from './draggable.directive';
import { DropTargetDirective } from './drop-target.directive';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ItemAppenderComponent } from './item-appender/item-appender.component';
import { HomeListComponent } from './home-list/home-list.component';
import { ExportComponent } from './export/export.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    PerspectiveSelectorComponent,
    DefSelectorComponent,
    DefCreatorComponent,
    DashboardComponent,
    KanbanComponent,
    ItemDetailComponent,
    ItemCardComponent,
    ItemPasterComponent,
    TypeDefViewComponent,
    KanbanListComponent,
    DraggableDirective,
    DropTargetDirective,
    FieldListablePipe,
    ItemAppenderComponent,
    HomeListComponent,
    ExportComponent
  ],
  providers: [ ItemService, DragService, TypeDefService, DefCurrentService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
