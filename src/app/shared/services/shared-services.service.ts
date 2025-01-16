import { inject, Injectable, signal } from '@angular/core';
import { MenuController } from "@ionic/angular/standalone";
import { ModalController, ModalOptions } from "@ionic/angular/standalone";
import { ToastController, ToastOptions } from "@ionic/angular";
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  menuController = inject(MenuController);
  modalController = inject(ModalController);
  toastController = inject(ToastController);
  spinnerService  = inject(NgxSpinnerService);

  isFullCart = signal<boolean>(false);
  test = signal<boolean>(true);
  userType = signal<number>(null);
  userAdmin = signal<boolean>(false);
  login = signal<boolean>(false);
  isMobile = signal<boolean>(false);
  userPhoto = signal<string>("");
  userName = signal<string>("");

         
  closeMenu(id:string){
    this.menuController.close(id);
  }

  openMenu(id:string){
    this.menuController.open(id);
  }

  /* Modal */
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data) return data;
  }

  closeModal(data?:any){
    return this.modalController.dismiss(data)
  }

  /* Usuario Admin o Normal */
  adminUser(){
    this.userType() == 0 ? this.userAdmin.set(true) : this.userAdmin.set(false)
  }

  /* Loading */
  loadingSpinnerShow(){
    this.spinnerService;
    this.spinnerService.show(undefined, {
      type: 'square-jelly-box',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#e2aa11',
      size: 'medium'
    });
  }

  loadingSpinnerHide(){
    this.spinnerService.hide();
  }

  /* Toast */
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  /* Local Storage */
  saveLogin(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  readLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

}
