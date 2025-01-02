import { inject, Injectable, signal } from '@angular/core';
import { MenuController } from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  menuController = inject(MenuController);
  isFullCart = signal<boolean>(false);
  test = signal<boolean>(true);
  isMenuOpen = signal<boolean>(false);
  isCartOpen = signal<boolean>(false);
  login = signal<boolean>(false);
  //menuEffect = signal<boolean>(false);
         
  closeMenu(id:string){
    this.menuController.close(id);
  }

  openMenu(id:string){
    this.menuController.open(id);
  }

}
