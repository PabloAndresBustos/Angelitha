import { Producto } from 'src/app/interfaces/producto.interfaces';
import { Component, inject, input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { SharedServicesService } from '../../services/shared-services.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../services/firebase.service';

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

  productId =  input.required<string>();
  productName = input.required<string>();
  productPrice = input.required<string>();
  productSubType = input.required<string>();
  productPicture = input.required<string>();
  productDescription = input.required<string>();

  adminUser() {
    return this.servicesController.userAdmin();
  }

  addToCart(){
    const selectedProducto: Producto = {
      id: this.productId(),
      name: this.productName(),
      price: this.productPrice(),
      subType: {type: this.productSubType()},
      picture: this.productPicture(),
      description: this.productDescription()
    };

    this.servicesController.productInCart().push(selectedProducto);
    
    this.servicesController.isEmptyCart();
            
    this.toastService.info(`El producto ${this.productName()} se agrego al carrito`)
  }

  removeFromPrincipal(id:string, pathPicture:string){
    let path = `Productos/${id}`
    let imagePath = this.firebaseService.imagePath(pathPicture)

    this.firebaseService.deleteDocument(path).then( async () => {
      this.firebaseService.deletePicture(pathPicture).then(()=>{
        this.firebaseService.getProducts();
        this.toastService.warning('Producto eliminado correctamente')
      })
    })
  }

  ngOnInit() {

  }

}
