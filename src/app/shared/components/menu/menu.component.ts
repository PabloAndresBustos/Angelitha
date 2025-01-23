import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Component, ElementRef, inject, input, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SharedServicesService } from '../../services/shared-services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubType } from 'src/app/interfaces/subTypes.interface';

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

  productTypeList(): SubType[]{
    return this.firebaseService.productType
  }

  filterType(type:string){
    
  }

  status(event: any) {
    if (event.detail.checked) {
      this.serviceController.test.update(value => value = !value);
    } else {
      this.serviceController.test.update(value => value = !value);
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
