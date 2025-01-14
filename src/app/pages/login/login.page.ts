import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { ValidatorFormComponent } from 'src/app/shared/components/custom-input/validator-form/validator-form.component';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    imports: [SharedModule, ValidatorFormComponent, CustomInputComponent]
})
export class LoginPage implements OnInit {

  router = inject(Router);
  servicesController = inject(SharedServicesService);
  firebase = inject(FirebaseService);

  loginForm = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl(1)
  });


  async login(){

    if(this.loginForm.valid){

      /* const loading = await this.servicesController.loading();
      loading.present() */

      this.firebase.login(this.loginForm.value as Usuario).then(res => {

        let uid = res.user.uid;
        let userName = res.user.displayName;
        this.loginForm.controls.uid.setValue(uid);
        
        this.servicesController.login.set(true); - /* Se debe realizar la modificacion para que el boton cerrar sesion aparezca en todas las cuentas. */
        this.router.navigateByUrl('/home');

        /* LocalStorage */ 
        /* delete this.loginForm.controls.password; */
        this.servicesController.saveLogin('user', this.loginForm.value);

        let path:string = `Usuario/${uid}`
        this.userInfo(path);

        this.servicesController.presentToast({
          header: 'BIENVENIDO',
          message: `HOLA! ${userName.toUpperCase()}!!`,
          duration: 1500,
          color: 'success',
          position: 'bottom',
          icon: 'person-outline'
        });

      }).catch(err => {
        
        this.servicesController.presentToast({
          message: `Error de usuario o contraseña: ${err.message}`,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline',
        });

        this.servicesController.login.set(false);
        this.router.navigateByUrl('/home');
      }).finally(() => {
        console.log('LOGIN CORRECTO')
      })
    }
  }

  /* Login With Google */
  async logInWithGoogle(){
    const googleAuth = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.firebase.fireAuth, googleAuth, browserPopupRedirectResolver).then( res => {
                               
        let user: Usuario = {
          'uid': res.user.uid,
          'name': res.user.displayName,
          'email': res.user.email,
          'type': 1
        }

        let path:string = `Usuario/${user.uid}` 
        this.userInfo(path);              

        this.setUserDocument(user.uid, user);

        this.servicesController.login.set(true); - /*  Se debe realizar la modificacion para que el boton cerrar sesion aparezca en todas las cuentas. */
        this.router.navigateByUrl('/home');
  
        this.servicesController.presentToast({
          header: 'BIENVENIDO',
          message: `HOLA! ${res.user.displayName.toUpperCase()}!!`,
          duration: 1500,
          color: 'success',
          position: 'bottom',
          icon: 'person-outline'
        });
  
      })  
    } catch (err) {
      
      this.servicesController.presentToast({
        message: `Error de usuario o contraseña: ${err.message}`,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline',
      });
    }
  
  }

  /* Obtener informacion de usuario desde la Base de datos */
  userInfo(path: string){
    this.firebase.obtenerDocumento(path).then((user: Usuario) => {
      console.log('DataBase user: ', user);
      this.servicesController.userType.set(user.type);
      this.servicesController.adminUser();
    })
  }

  /* Trae el correo desde localstorage para rellenar el formulario  */
  autoLogin(){
    const user:any = this.servicesController.readLocalStorage('user');
    if(user){
      this.loginForm.controls.email.setValue(user.email);
    }
  }

  /* Crea el documento de usuario en la Base de datos */
  async setUserDocument(uid: string, user: Usuario) {
    let path: string = `Usuario/${uid}`
    this.firebase.createDocument(path, user).then(async res => {
      console.log(res);
    })
  }

  goToHome(){
    this.router.navigateByUrl('/home');
  }

  goToRegister(){
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
    this.autoLogin();
  }

}
