import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  router = inject(Router);
  servicesController = inject(SharedServicesService);
  firebase = inject(FirebaseService);


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  isPassword: boolean;
  hide: boolean = true;
  type:string = 'password';

  async login(){
    if(this.loginForm.valid){

      const loading = await this.servicesController.loading();
      loading.present()

      this.firebase.login(this.loginForm.value as Usuario).then(res => {
        this.servicesController.login.set(true);
        this.router.navigateByUrl('/home'); 

        this.servicesController.presentToast({
          message: `Bienvenido!!`,
          duration: 1500,
          color: 'success',
          position: 'bottom'
        })

      }).catch(err => {
        
        this.servicesController.presentToast({
          message: `Error de usuario o contraseña: ${err.message}`,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

        this.servicesController.login.set(false);
        this.router.navigateByUrl('/home');
      }).finally(() => {
        loading.dismiss();
      })
    }else{
      console.log("Formulario invalido")
    }

  }

  showHidePassword(){
    this.hide = !this.hide

    this.hide ? this.type = 'password' : this.type = 'text'
  }

  goToHome(){
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

}
