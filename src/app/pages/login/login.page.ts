import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  login(){
    console.log({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
      }
    )
    this.servicesController.login.set(true);
    this.router.navigateByUrl('/home');
  }

  goToHome(){
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

}
