import { Component, ElementRef, inject, input, signal} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SharedServicesService } from '../../services/shared-services.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    imports: [SharedModule, HeaderComponent, FooterComponent]
})
export class MenuComponent{

  serviceController = inject(SharedServicesService);
  
  isPrincipal = input<boolean>(true);
  side = input<string>('start');
  menuId = input<string>(''); 
  
  productList:string[] = [
    'Agendas', 'Planners', 'Albums', 'Cuadernos', 'Anotadores' 
  ]

  status(event: any){
    if(event.detail.checked){
      this.serviceController.test.update(value => value = !value);
    }else{
      this.serviceController.test.update(value => value = !value);
    }
  }

  userPhoto(){
    return this.serviceController.userPhoto();
  }

  userName(){
    return this.serviceController.userName();
  }

  login(){
    return this.serviceController.login();
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
