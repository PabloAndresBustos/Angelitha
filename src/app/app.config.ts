import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideRouter,  RouteReuseStrategy, withPreloading, PreloadAllModules } from "@angular/router";
import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "src/environments/environment";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";


export const appConfig: ApplicationConfig = {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideZoneChangeDetection({eventCoalescing: true}),
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

