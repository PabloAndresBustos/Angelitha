import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarrouselComponent implements OnInit{

  productPicture = input.required<string>();

  pictureSource:string = 'assets/product';

  pictures:string[] = [];

  ngOnInit(){
    for(let i=0; i<5; i++ ){
      this.pictures.push(`${this.pictureSource}/foto${i}.jpg`);
    }
    console.log(this.pictures);
  }

}
