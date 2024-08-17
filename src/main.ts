import { enableProdMode, importProvidersFrom } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { ChoiceDataService } from './app/shared/choice-data.service';
import { LocalStorageService } from './app/shared/local-storage.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, AppRoutingModule),
        ChoiceDataService, LocalStorageService, provideAnimationsAsync()
    ]
});
