import { Component, inject, input, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SharedServicesService } from '../../services/shared-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class HeaderComponent{

  serviceController = inject(SharedServicesService);
  router = inject(Router);

  title = input<string>('');
  isMenu = input<boolean>(false);
  backgroundColor = input<string>('');
  closeMenuButton = input<string>('');

  isFullCart = this.serviceController.isFullCart();

  closeMenu(){
    this.serviceController.closeMenu(this.closeMenuButton());
    
    if(this.serviceController.isMenuOpen()){
      this.serviceController.isMenuOpen.update(value => !value);
    }else if(this.serviceController.isCartOpen()){
      this.serviceController.isCartOpen.update(value => !value);
    }
  }

  openMenu(id:string){
    this.serviceController.openMenu(id);
    this.serviceController.isMenuOpen.update(value => !value);
  }

  openCart(id:string){
    this.serviceController.openMenu(id);
    this.serviceController.isCartOpen.update(value => !value);
  }

  goToAdmin(){
    this.router.navigateByUrl('/login');
  }

  login(){
    return this.serviceController.login();
  }

  logOut(){
    this.serviceController.login.set(false);
    /* localStorage.removeItem('user'); */
  }

}
