import { AfterViewInit, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { SharedServicesService } from './shared/services/shared-services.service';

register();

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    imports: [IonApp, IonRouterOutlet]
})
export class AppComponent implements OnInit, AfterViewInit {

  servicesController = inject(SharedServicesService);

  with: number;

  @HostListener('window:resize', ['$event'])
  mobileSize(event: any) {
    this.screenSize();
  }

  /* Cambio de Responsive */
  screenSize() {
    this.with = window.innerWidth;
    this.with <= 500 ? this.servicesController.isMobile.set(true) : this.servicesController.isMobile.set(false)
  }


  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.screenSize();
  }

}
