import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { warningValidators } from './utils/warning-form.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'FormWarning';

  profileForm = this._fb.group({
    firstName: this._fb.control('', [
      warningValidators([
        this.forbiddenNameValidator(),
        this.digitNameValidator(),
        this.forbiddenNameAbc(),
      ]),
      this.forbiddenNameValidator(),
    ]),
    lastName: this._fb.control('', [
      this.forbiddenNameValidator(),
      this.digitNameValidator(),
    ]),
  });

  public get validForm(): boolean {
    return this.profileForm.valid;
  }

  constructor(private _fb: FormBuilder, private _cd: ChangeDetectorRef) {
    setTimeout(() => {
      console.log(this.profileForm);
    }, 500);
  }

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '1234') {
        return { forbiddenName: { value: 'invalidFormat' } };
      }
      return null;
    };
  }

  forbiddenNameAbc(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '1234') {
        return { abc: { value: 'invalid' } };
      }
      return null;
    };
  }

  digitNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '123456') {
        return { diginName: { value: 'digitFormat' } };
      }
      return null;
    };
  }
}
