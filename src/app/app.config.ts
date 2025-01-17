import { ProgressAnimationType } from './../../node_modules/ngx-toastr/toastr/toastr-config.d';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideRouter,  RouteReuseStrategy, withPreloading, PreloadAllModules } from "@angular/router";
import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "src/environments/environment";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideAnimations(),
        provideZoneChangeDetection({
            eventCoalescing: true
        }),
        provideToastr({
            timeOut: 2500,
            positionClass: 'toast-bottom-center',
            progressBar: true,
            progressAnimation: 'increasing'
        }),
        provideHttpClient(
            withFetch(),
        ),
        provideRouter(routes, withPreloading(PreloadAllModules)),

        /* firebase */
        provideFirebaseApp(
            () => initializeApp(environment.firebaseConfig)
        ),
        provideAuth(
            () => getAuth()
        ),
        provideFirestore(
            () => getFirestore()
        ),
    ]
}

