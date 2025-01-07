import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withFetch } from "@angular/common/http";
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
        provideHttpClient(withFetch()),
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
        ), provideFirebaseApp(() => initializeApp({"projectId":"angelitha-web-app","appId":"1:991356467165:web:d37403ec212d31eba76834","storageBucket":"angelitha-web-app.firebasestorage.app","apiKey":"AIzaSyD3CzJSLwVc0H6QljS0Tx-h4QmYre3DRjI","authDomain":"angelitha-web-app.firebaseapp.com","messagingSenderId":"991356467165"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
    ]
}

