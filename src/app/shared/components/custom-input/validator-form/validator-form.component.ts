import { Component, input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
    selector: 'app-validator-form',
    templateUrl: './validator-form.component.html',
    styleUrls: ['./validator-form.component.scss'],
    imports: [SharedModule]
})
export class ValidatorFormComponent implements OnInit {

  slot = input.required<string>();
  message = input.required<string>();
  showMessage = input.required<boolean>();

  constructor() { }

  ngOnInit() { }

}
