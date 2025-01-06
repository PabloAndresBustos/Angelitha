import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  standalone: true,
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
    password: new FormControl('', [Validators.required])
  });


  async login(){

    if(this.loginForm.valid){

      const loading = await this.servicesController.loading();
      loading.present()

      this.firebase.login(this.loginForm.value as Usuario).then(res => {

        let uid = res.user.uid;
        let userName = res.user.displayName;
        this.loginForm.controls.uid.setValue(uid);
        
        this.servicesController.login.set(true);
        this.router.navigateByUrl('/home');

        /* LocalStorage */ 
        /* delete this.loginForm.controls.password; */
        this.servicesController.saveLogin('user', this.loginForm.value);

        /* let path:string = `Usuario/${uid}`
        this.userInfo(path, uid); */

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
        loading.dismiss();
      })
    }
  }

  userInfo(path: string, uid:string){
    this.firebase.obtenerDocumento(path).then((user: Usuario) => {
      console.log(user);
    })
  }

  autoLogin(){
    const user:any = this.servicesController.readLocalStorage('user');
    if(user){
      this.loginForm.controls.email.setValue(user.email);
    }
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
