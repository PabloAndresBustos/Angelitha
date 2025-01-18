import { Component, inject, input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { SharedServicesService } from '../../services/shared-services.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  imports: [SharedModule, CarrouselComponent]
})
export class ProductItemComponent implements OnInit {

  servicesController = inject(SharedServicesService);

  productName = input.required<string>();
  productPrice = input.required<string>();
  productSubType = input.required<string>();
  productPicture = input.required<string>();
  productDescription = input.required<string>();

  adminUser() {
    return this.servicesController.userAdmin();
  }

  constructor() { }

  ngOnInit() {

  }

}
