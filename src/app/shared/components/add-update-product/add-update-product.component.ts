import { Component, inject} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { SharedServicesService } from '../../services/shared-services.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-add-update-product',
    templateUrl: './add-update-product.component.html',
    styleUrls: ['./add-update-product.component.scss'],
    standalone: true,
    imports: [SharedModule, CustomInputComponent]
})

export class AddUpdateProductComponent{
  
  servicesController = inject(SharedServicesService);

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

  cancel(){
    this.servicesController.closeModal()
  }

}
