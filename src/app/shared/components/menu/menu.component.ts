import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Component, ElementRef, inject, input, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SharedServicesService } from '../../services/shared-services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubType } from 'src/app/interfaces/subTypes.interface';
import { Producto } from 'src/app/interfaces/producto.interfaces';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [SharedModule, HeaderComponent, FooterComponent]
})
export class MenuComponent implements OnInit {

  serviceController = inject(SharedServicesService);
  firebaseService = inject(FirebaseService)
  toastService = inject(ToastrService);
  router = inject(Router);

  isPrincipal = input<boolean>(true);
  side = input<string>('start');
  menuId = input<string>('');

  priceFilterForm = new FormGroup({
    minPrice: new FormControl(''),
    maxPrice: new FormControl('')
  })

  productTypeList(): SubType[]{
    return this.firebaseService.productType
  }

  filterPoduct(event: any, type:string) {
    if (event.detail.checked) {
      const filterTypes:Producto[] = this.firebaseService.productsList().filter(producto => producto.subType.type === type);
      this.firebaseService.productsList.set(filterTypes);
      this.firebaseService.productListFilter.set(this.firebaseService.productsList().length);
    } else {
      this.firebaseService.getProducts();
    }
  }

  userPhoto() {
    return this.serviceController.userPhoto();
  }

  userName() {
    return (this.serviceController.userName()).toUpperCase();
  }

  login() {
    return this.serviceController.login();
  }

  goToAdrress() {
    this.router.navigateByUrl('/adress');
  }

  productInCart() {
    return this.serviceController.productInCart();
  }

  /* Remover del carrito */
  removeFromCart(id: string) {
    const productList = this.serviceController.productInCart();
    this.serviceController.updateList(id, productList);
    this.serviceController.isEmptyCart();
    const productsPrice = productList.reduce((acc, product) => acc + product.price, 0);

    this.serviceController.totalPrice.set(productsPrice);

    this.toastService.info(`El producto se elimino del carrito`);
  }

  priceFilter(){
    const min:number = 0;
    const max:number = 9999999;
    console.log(this.priceFilterForm.value)
    /* const filterList:Producto[] = this.firebaseService.productsList().filter(producto => {
      
    })

    console.log(filterList) */
    console.log(this.priceFilterForm.value)
  }

  ngOnInit() {
    this.productInCart();
    this.firebaseService.getSubTypes();
  }



  /* onWillOpen(){
    this.serviceController.isMenuOpen.update(value => !value);
    this.serviceController.isCartOpen.update(value => !value);
  } */
  /* onWillClose(){
    this.serviceController.isMenuOpen.update(value => !value);
    this.serviceController.isCartOpen.update(value => !value);
  } */
  /* onDidOpen(){
    this.serviceController.isMenuOpen.update(value => !value);
    this.serviceController.isCartOpen.update(value => !value);
  } */
  /* onDidClose(){
    this.serviceController.isMenuOpen.update(value => !value);
    this.serviceController.isCartOpen.update(value => !value);
  } */

}
