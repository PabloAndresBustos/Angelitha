import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IonTitle, IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
  standalone: true,
  imports:[IonTitle, IonHeader, IonToolbar]
})

export class AddUpdateProductComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
