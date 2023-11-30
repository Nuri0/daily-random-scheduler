import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutedComponents } from "./app-routing.module";
import { AppComponent } from './app.component';
import { ChoiceGroupOverviewComponent } from './choice-group-overview/choice-group-overview.component';

import { ChoiceGroupDetailComponent } from './choice-group-detail/choice-group-detail.component';
import { ChoiceOverviewComponent } from './choice-overview/choice-overview.component';
import { ChoiceDataService } from "./shared/choice-data.service";
import { LocalStorageService } from "./shared/local-storage.service";

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
    AppRoutingModule
  ],
  providers: [ChoiceDataService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
