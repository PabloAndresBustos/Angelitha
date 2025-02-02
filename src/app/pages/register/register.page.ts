import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { ValidatorFormComponent } from 'src/app/shared/components/custom-input/validator-form/validator-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    imports: [SharedModule, CustomInputComponent, ValidatorFormComponent]
})
export class RegisterPage{

  router = inject(Router);
  firebase = inject(FirebaseService);
  servicesController = inject(SharedServicesService);

  registerForm = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    type: new FormControl(environment.adminUser)
  })

  async register() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {

      this.servicesController.loadingSpinnerShow();
      
      return this.firebase.createUser(this.registerForm.value as Usuario).then(async res => {

        /* Crear usuario en la base de datos */
        let uid = res.user.uid;
        this.registerForm.controls.uid.setValue(uid);
        await this.setUserDocument(uid);
        /* -- */

        /* Guardado local del inicio de sesion */
        this.servicesController.saveLogin('user', this.registerForm.value);
        /* -- */

        await this.firebase.updateUser(this.registerForm.value.name);

        this.servicesController.welcome(`HOLA! ${this.registerForm.value.name.toUpperCase()}!!`);
       
        this.router.navigateByUrl('/login');

      }).catch(err => {

        this.servicesController.loginFail(err.message);

        this.servicesController.login.set(false);
        this.router.navigateByUrl('/home');
      }).finally(() => {
        this.registerForm.reset();
        this.servicesController.loadingSpinnerHide();
      })
    }
  }

  async setUserDocument(uid: string) {

    let path: string = `Usuario/${uid}`
    delete this.registerForm.value.password;

    this.firebase.createDocument(path, this.registerForm.value as Usuario)
  }

  goToHome() {
    return this.router.navigateByUrl('/home');
  }

}
