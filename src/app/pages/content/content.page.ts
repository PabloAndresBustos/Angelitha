import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { ProductItemComponent } from 'src/app/shared/components/product-item/product-item.component';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Producto } from 'src/app/interfaces/producto.interfaces';


@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  imports: [SharedModule, HeaderComponent, MenuComponent, ProductItemComponent, FooterComponent]
})

export class ContentPage implements OnInit{

  servicesController = inject(SharedServicesService); 
  firebase = inject(FirebaseService);

  isMobile(){
    return this.servicesController.isMobile();
  }

  visibleElement(){
    return this.servicesController.test();
  }

  login(){
    return this.servicesController.login();
  }

  adminUser(){
    return this.servicesController.userAdmin();
  }

  addUpdateProduct(){
    this.servicesController.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal'
    });
  }

  productList(): Producto[]{
    return this.firebase.productsList();
  }

  productListLength():boolean{
    if(!this.servicesController.isMobile()){
      if(this.firebase.productListFilter() <= 2){
        return true
      }else{
        return false
      }
    }else{
      return false
    }

  }

  

  async ngOnInit() {
    this.servicesController.loadingSpinnerShow();
    await this.firebase.getProducts();
    this.servicesController.loadingSpinnerHide(); 
  }
  
}
