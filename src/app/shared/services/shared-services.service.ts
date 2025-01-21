import { inject, Injectable, signal } from '@angular/core';
import { MenuController } from "@ionic/angular/standalone";
import { ModalController, ModalOptions } from "@ionic/angular/standalone";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Producto } from 'src/app/interfaces/producto.interfaces';


@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  menuController = inject(MenuController);
  modalController = inject(ModalController);
  spinnerService = inject(NgxSpinnerService);
  toastService = inject(ToastrService);
  
  isFullCart = signal<boolean>(false);
  test = signal<boolean>(true);
  userType = signal<number>(null);
  userAdmin = signal<boolean>(false);
  login = signal<boolean>(false);
  isMobile = signal<boolean>(false);
  userPhoto = signal<string>("");
  userName = signal<string>("");
  productInCart = signal<Producto[]>([]);
 
  closeMenu(id: string) {
    this.menuController.close(id);
  }

  openMenu(id: string) {
    this.menuController.open(id);
  }

  /* Is full cart */
  isEmptyCart(){
    if(this.productInCart().length != 0 ){
      this.isFullCart.set(true)
    }else{
      this.isFullCart.set(false)
    }
  }

  /* Modal */
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) return data;
  }

  closeModal(data?: any) {
    return this.modalController.dismiss(data)
  }

  /* Usuario Admin o Normal */
  adminUser() {
    this.userType() == 0 ? this.userAdmin.set(true) : this.userAdmin.set(false)
  }

  /* Toast */
  /* Login correcto */
  welcome(userName: string) {
    return this.toastService.success(`¡¡HOLA ${userName.toUpperCase()}!!`);
  }

  /* Login Erroneo */
  loginFail(err: any) {
    return this.toastService.warning(`Error de usuario o contraseña: ${err.message}`);
  }

  /* Loading */
  loadingSpinnerShow() {
    this.spinnerService.show(undefined, {
      type: 'square-jelly-box',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#e2aa11',
      size: 'medium'
    });
  }

  loadingSpinnerHide() {
    this.spinnerService.hide();
  }

  /* Local Storage */
  saveLogin(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  readLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  /* Camara */
  async takePicture(promptLabelHeader: string){
    return await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader, 
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una Foto'
    });
  }
}
