import { Component, inject, input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SharedServicesService } from '../../services/shared-services.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [SharedModule, HeaderComponent]
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
