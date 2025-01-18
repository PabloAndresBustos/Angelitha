import { Component, inject, OnInit} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { SharedServicesService } from '../../services/shared-services.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { FirebaseService } from '../../services/firebase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-update-product',
    templateUrl: './add-update-product.component.html',
    styleUrls: ['./add-update-product.component.scss'],
    standalone: true,
    imports: [SharedModule, CustomInputComponent]
})

export class AddUpdateProductComponent implements OnInit{
  
  servicesController = inject(SharedServicesService);
  firebase = inject(FirebaseService);
  toastService = inject(ToastrService);
    
  productForm = new FormGroup({
    uid: new FormControl(),
    picture: new FormControl(),
    name: new FormControl(),
    subType: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  });

  async takePicture(){
    const dataUrl = (await this.servicesController.takePicture('Imagen del producto')).dataUrl
    this.productForm.controls.picture.setValue(dataUrl);
  }

  async uploadProduct(){
    if(this.productForm.valid){
      
      let dataUrl = this.productForm.value.picture;

      this.productForm.controls.picture.setValue(dataUrl);

      this.firebase.addProduct('Productos', this.productForm.value).then(() => {
        this.servicesController.loadingSpinnerShow();
        this.servicesController.modalController.dismiss();
        this.toastService.success(`!!PRODUCTO ${this.productForm.value.name.toUpperCase()} PUBLICADO CORRECTAMENTE`);
      }).catch(err => {
        this.toastService.error('No fue posible subir el producto verifica los datos o conexion');
      }).finally(()=> {
        this.servicesController.loadingSpinnerHide();
      })
    }
  }

  cancel(){
    this.servicesController.closeModal()
  }

  ngOnInit(){
    
  }

}
