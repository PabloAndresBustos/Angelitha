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
import { environment } from 'src/environments/environment';


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

  superUser = environment.proUser;

  /* error capture */
  errorCapture:any

  loginForm = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl(environment.adminUser)
  });


  async login() {

    if (this.loginForm.valid) {

      this.servicesController.loadingSpinnerShow();

      this.firebase.login(this.loginForm.value as Usuario).then(res => {

        let uid = res.user.uid;
        this.loginForm.controls.uid.setValue(uid);

        this.servicesController.userName.set(res.user.displayName);

        this.servicesController.login.set(true);
        this.router.navigateByUrl('/home');       

        /* LocalStorage */
        /* delete this.loginForm.controls.password; */
        this.servicesController.saveLogin('user', this.loginForm.value);

        let path: string = `Usuario/${uid}`
        this.userInfo(path);

        this.servicesController.welcome(res.user.displayName);
               
      }).catch(err => {

        this.servicesController.loginFail(err.message);

        this.servicesController.login.set(false);
        this.router.navigateByUrl('/home');

      }).finally(async () => {

        this.loginForm.reset();
        this.servicesController.loadingSpinnerHide();
      
      })
    }
  }

  /* Login With Google */
  async logInWithGoogle() {
    const googleAuth = new GoogleAuthProvider();
    await signInWithPopup(this.firebase.fireAuth, googleAuth, browserPopupRedirectResolver).then(res => {
            
      const userMail = res.user.email
      let userType:number;

      userMail == this.superUser ? userType = 0 : userType = 1
      
      this.servicesController.userPhoto.set(res.user.photoURL);
      this.servicesController.userName.set(res.user.displayName);     
      
      let user: Usuario = {
        'uid': res.user.uid,
        'name': res.user.displayName,
        'email': res.user.email,
        'type': userType
      }

      let path: string = `Usuario/${user.uid}`
      this.userInfo(path);

      this.setUserDocument(user.uid, user);

      this.servicesController.login.set(true);
      this.router.navigateByUrl('/home');

      this.servicesController.welcome(res.user.displayName);

    }).catch(err => {

      this.servicesController.loginFail(err.message);

      this.servicesController.login.set(false);
      this.router.navigateByUrl('/home');
    })
  }

  /* Obtener informacion de usuario desde la Base de datos */
  userInfo(path: string) {
    this.firebase.obtenerDocumento(path).then((user: Usuario) => {
      this.servicesController.userType.set(user.type);
      this.servicesController.adminUser();
    })
  }

  /* Trae el correo desde localstorage para rellenar el formulario  */
  autoLogin() {
    const user: any = this.servicesController.readLocalStorage('user');
    if (user) {
      this.loginForm.controls.email.setValue(user.email);
    }
  }

  /* Crea el documento de usuario en la Base de datos */
  async setUserDocument(uid: string, user: Usuario) {
    let path: string = `Usuario/${uid}`
    this.firebase.createDocument(path, user);
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
    this.autoLogin();
  }

}
