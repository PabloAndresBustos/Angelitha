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
}
