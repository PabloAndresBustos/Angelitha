import { Component, inject, OnInit} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { SharedServicesService } from '../../services/shared-services.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { FirebaseService } from '../../services/firebase.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorFormComponent } from '../custom-input/validator-form/validator-form.component';
import { Producto } from 'src/app/interfaces/producto.interfaces';

@Component({
    selector: 'app-add-update-product',
    templateUrl: './add-update-product.component.html',
    styleUrls: ['./add-update-product.component.scss'],
    standalone: true,
    imports: [SharedModule, CustomInputComponent, ValidatorFormComponent]
})

export class AddUpdateProductComponent implements OnInit{
  
  servicesController = inject(SharedServicesService);
  firebase = inject(FirebaseService);
  toastService = inject(ToastrService);

  user:Usuario = this.servicesController.readLocalStorage('user');
    
  productForm = new FormGroup({
    id: new FormControl(''),
    picture: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    subType: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  async takePicture(){
    const dataUrl = (await this.servicesController.takePicture('Imagen del producto')).dataUrl
    this.productForm.controls.picture.setValue(dataUrl);
  }

  async uploadProduct(){
    if(this.productForm.valid){
      
      let dataUrl = this.productForm.value.picture;
      let path = `${this.user.uid}/${Date.now()}`;
      let productId = `${this.user.uid}` + `${Date.now()}`

      this.productForm.controls.id.setValue(productId);
      this.productForm.controls.picture.setValue(dataUrl);

      /* Convertimos SubType a texto */
      const producto: Producto = {
        id: productId, 
        picture: '',
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        subType: {type: this.productForm.value.subType}
      }    

      this.servicesController.loadingSpinnerShow();



      await this.firebase.addPicture(path, this.productForm.value.picture).then(res => {
        console.log(res);
        producto.picture = res;
        this.firebase.addProduct('Productos', producto).then(() => {
        this.servicesController.modalController.dismiss();
        this.toastService.success(`!!PRODUCTO ${this.productForm.value.name.toUpperCase()} PUBLICADO CORRECTAMENTE`);
        })
      }).catch(err => {
        this.toastService.error(`No fue posible subir el producto : ${err}`);
      }).finally(() => {
        this.servicesController.loadingSpinnerHide();
        this.firebase.getProducts();
      })
    }
  }

  getSubTypes(){
    return this.firebase.productType;
  }

  cancel(){
    this.servicesController.closeModal()
  }

  ngOnInit(){
    this.firebase.getSubTypes();
  }

}
