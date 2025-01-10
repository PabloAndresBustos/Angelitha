import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { ProductItemComponent } from 'src/app/shared/components/product-item/product-item.component';
import { Product } from 'src/app/interfaces/producto.interfaces';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  imports: [SharedModule, HeaderComponent, MenuComponent, ProductItemComponent, FooterComponent, MatProgressSpinner]
})

export class ContentPage{

  servicesController = inject(SharedServicesService); 

  isMobile(){
    return this.servicesController.isMobile();
  }

  visibleElement(){
    return this.servicesController.test();
  }

  login(){
    return this.servicesController.login();
  }

  addUpdateProduct(){
    this.servicesController.presentModal({
      component: AddUpdateProductComponent
    });
  }

  productsList:Product[] = [
    
  ]
  
}
