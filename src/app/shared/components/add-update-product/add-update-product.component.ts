import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
/* import { IonTitle, IonHeader, IonToolbar } from "@ionic/angular/standalone"; */
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
  standalone: true,
  imports: [SharedModule, HeaderComponent]
})

export class AddUpdateProductComponent  implements OnInit {
  
  constructor() { }

  ngOnInit() {}

}
