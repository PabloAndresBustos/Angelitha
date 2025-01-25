import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { ApplicationConfig, inject, provideZoneChangeDetection } from "@angular/core";
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideRouter,  RouteReuseStrategy, withPreloading, PreloadAllModules } from "@angular/router";
import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "src/environments/environment";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore,  } from "@angular/fire/firestore";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { getStorage, provideStorage } from '@angular/fire/storage';

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
            positionClass: 'toast-top-center',
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
        provideStorage(
            () => getStorage()
        )
    ]
}

