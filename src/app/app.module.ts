import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule, RoutedComponents} from "./app-routing.module";
import { ChoiceGroupOverviewComponent } from './choice-group-overview/choice-group-overview.component';

import {ChoiceDataService} from "./shared/choice-data.service";
import {LocalStorageService} from "./shared/local-storage.service";
import { ChoiceGroupDetailComponent } from './choice-group-detail/choice-group-detail.component';
import { ChoiceOverviewComponent } from './choice-overview/choice-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutedComponents,
    ChoiceGroupOverviewComponent,
    ChoiceGroupDetailComponent,
    ChoiceOverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ChoiceDataService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
