import { Component, Input, input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CustomInputComponent implements OnInit {

  @Input() inputType:string;
  iconName = input.required<string>();
  inputLabel = input.required<string>();
  formControlValue = input<FormControl>();

  /* Mostrar o Ocultar Password */
  isPassword = input.required<boolean>();
  hide: boolean = true;
  type:string = 'password';

  showHidePassword() {
    this.hide = !this.hide
    this.hide ? this.inputType = 'password' : this.inputType = 'text'
  }

  ngOnInit() { }

}
