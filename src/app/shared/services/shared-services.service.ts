import { inject, Injectable, signal } from '@angular/core';
import { MenuController } from "@ionic/angular/standalone";
import { ModalController, ModalOptions } from "@ionic/angular/standalone";
import { LoadingController, ToastController, ToastOptions } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  menuController = inject(MenuController);
  modalController = inject(ModalController);
  loadingCtrl = inject(LoadingController);
  toastController = inject(ToastController);

  isFullCart = signal<boolean>(false);
  test = signal<boolean>(true);
  userType = signal<number>(1);
  login = signal<boolean>(false);
  isMobile = signal<boolean>(false);

         
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
  AdminUser(type:number){
    type == 0 ? this.login.set(true) : this.login.set(false)
  }

  /* Loading */
  loading(){
    return this.loadingCtrl.create({
      spinner: 'bubbles'
    })
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
