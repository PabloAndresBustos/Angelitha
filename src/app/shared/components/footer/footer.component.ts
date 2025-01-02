import { Component, inject, input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SharedServicesService } from '../../services/shared-services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class FooterComponent{

  serviceController = inject(SharedServicesService);

  isMenu = input<boolean>(false);
  isCart = input<boolean>(false);

  closeCart(id:string){
    if(this.serviceController.isFullCart()){
      this.serviceController.closeMenu(id);
    }else{
      console.log('El carrito esta vacio');
    }
    
  }

}
