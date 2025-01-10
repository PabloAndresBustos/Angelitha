import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { SharedServicesService } from '../../services/shared-services.service';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
    imports: [SharedModule, CarrouselComponent]
})
export class ProductItemComponent  implements OnInit {

  servicesController = inject(SharedServicesService);

  login(){
    return this.servicesController.login();
  }
  
  constructor() { }

  ngOnInit() {
    console.log(this.servicesController.login())
    this.login();
  }

}
