import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class NotFoundPage{

  router = inject(Router);

  goToHome(){
    this.router.navigateByUrl('/home');
  }
    
}
