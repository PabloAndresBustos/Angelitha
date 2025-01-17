import { bootstrapApplication } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { appConfig } from './app/app.config';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

bootstrapApplication(AppComponent, appConfig).catch((err) => 
  console.log(err)
);

if (environment.production) {
  enableProdMode();
}

defineCustomElements(window);

register();
