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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorFormComponent } from '../custom-input/validator-form/validator-form.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [SharedModule, HeaderComponent, FooterComponent, ValidatorFormComponent]
})
export class MenuComponent implements OnInit {

  serviceController = inject(SharedServicesService);
  firebaseService = inject(FirebaseService)
  toastService = inject(ToastrService);
  router = inject(Router);

  isPrincipal = input<boolean>(true);
  side = input<string>('start');
  menuId = input<string>('');
  checked = signal<boolean>(false);

  priceFilterForm = new FormGroup({
    minPrice: new FormControl('', [Validators.required]),
    maxPrice: new FormControl('', [Validators.required])
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

  priceFilter(){
    let min:number = parseFloat(this.priceFilterForm.controls.minPrice.value);
    let max:number = parseFloat(this.priceFilterForm.controls.maxPrice.value);
   
    const filterList:Producto[] = [];

    this.firebaseService.productsList().map( product => {
      if(product.price >= min && product.price <= max){
        filterList.push(product)
      }
    });

    this.firebaseService.productsList.set(filterList);
  }

  restore(){
    this.firebaseService.getProducts();
    this.priceFilterForm.reset();
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
