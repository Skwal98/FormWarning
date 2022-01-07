import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FormWarning';

  profileForm = this._fb.group({
    firstName: this._fb.control('', this.forbiddenNameValidator()),
    lastName: [''],
  });

  public get validFirstNameControl(): boolean {
    return this.profileForm.valid;
  }

  constructor(private _fb: FormBuilder) {
    setTimeout(() => {
      console.log(this.profileForm);
    }, 500);
  }

  forbiddenNameValidator(): ValidatorFn {
    const warningFn = (
      control: AbstractControlWarning
    ): ValidationErrors | null => {
      if (control.value === '1') {
        control.warnings = { forbiddenName: { value: 'invalid data' } };
      } else {
        control.warnings = null;
      }
      return null;
    };
    return warningFn as ValidatorFn;
  }
}

export interface AbstractControlWarning extends AbstractControl {
  warnings: any;
}

export interface WarningFn {
  (control: AbstractControlWarning): ValidationErrors | null;
}
