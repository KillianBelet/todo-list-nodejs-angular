/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';



registerLocaleData(localeFr); 
bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOCALE_ID,      useValue: 'fr' },
    provideHttpClient(),                             
    provideRouter(routes),                           
    importProvidersFrom(NgbModule), 
    importProvidersFrom(BrowserAnimationsModule),                    
    importProvidersFrom(
      CalendarModule.forRoot({                      
        provide: DateAdapter,
        useFactory: adapterFactory,
      })
    ),
  ],
})
.catch(err => console.error(err));