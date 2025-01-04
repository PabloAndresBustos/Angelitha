import { Component, input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CustomInputComponent  implements OnInit {

  slot = input.required<string>();
  name  = input.required<string>();
  type  = input.required<string>();
  label  = input.required<string>();

  constructor() { }

  ngOnInit() {}

}
