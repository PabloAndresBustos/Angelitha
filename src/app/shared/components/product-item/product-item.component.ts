import { Producto } from 'src/app/interfaces/producto.interfaces';
import { Component, inject, input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { SharedServicesService } from '../../services/shared-services.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../services/firebase.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  imports: [SharedModule, CarrouselComponent]
})
export class ProductItemComponent implements OnInit {

  servicesController = inject(SharedServicesService);
  firebaseService = inject(FirebaseService);
  toastService = inject(ToastrService);

  productId = input.required<string>();
  productName = input.required<string>();
  productPrice = input.required<number>();
  productSubType = input.required<string>();
  productPicture = input.required<string>();
  productDescription = input.required<string>();

  user: Usuario = this.servicesController.readLocalStorage('user');

  adminUser() {
    return this.servicesController.userAdmin();
  }

  addToCart() {
    const selectedProducto: Producto = {
      id: this.productId(),
      name: this.productName(),
      price: this.productPrice(),
      subType: { type: this.productSubType() },
      picture: this.productPicture(),
      description: this.productDescription()
    };

    this.servicesController.productInCart().push(selectedProducto);

    this.servicesController.isEmptyCart();

    let productsPrice = 0;

    for (let i = 0; i < this.servicesController.productInCart().length; i++) {
      this.servicesController.totalPrice.set(
        productsPrice += this.servicesController.productInCart()[i].price
      )
    }

    this.servicesController.totalPrice.set(productsPrice);

    this.toastService.info(`El producto ${this.productName()} se agrego al carrito`)
  }

  async removeFromPrincipal(id: string, pathPicture: string) {

    let imagePath = await this.firebaseService.imagePath(pathPicture)
    let firebasePath = `Productos/${id}`

    this.firebaseService.deletePicture(imagePath).then(async () => {

      this.servicesController.updateList(id, this.firebaseService.productsList());
      await this.firebaseService.deleteDocument(firebasePath) 
      
      this.toastService.error('El producto se elimino correctamente');
    })
  }

  ngOnInit() {

  }

}
