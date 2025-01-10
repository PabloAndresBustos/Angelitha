import { Component, inject, input, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SharedServicesService } from '../../services/shared-services.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [SharedModule]
})
export class HeaderComponent implements OnInit{

  serviceController = inject(SharedServicesService);
  firebase = inject(FirebaseService);
  router = inject(Router);

  title = input<string>('');
  isMenu = input<boolean>(false);
  backgroundColor = input<string>('');
  closeMenuButton = input<string>('');

  isFullCart = this.serviceController.isFullCart();

  closeMenu(){
    this.serviceController.closeMenu(this.closeMenuButton());    
  }

  openMenu(id:string){
    this.serviceController.openMenu(id);
  }

  openCart(id:string){
    this.serviceController.openMenu(id);
  }

  goToAdmin(){
    this.router.navigateByUrl('/login');
  }

  login(){
    return this.serviceController.login();
  }

  logOutButton(){
    console.log(this.serviceController.isMobile());
    return this.serviceController.isMobile();
  }

  logOut(){
    this.firebase.logOut();
    this.serviceController.login.set(false);
    this.router.navigateByUrl('/home');
    /* localStorage.removeItem('user'); */
  }

  ngOnInit(): void {
    this.logOutButton()
  }

}
