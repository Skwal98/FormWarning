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
import { BehaviorSubject } from 'rxjs';
import { WarningMessageType } from './warning-form-info/warning-form-info.component';

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
      this.forbiddenNameValidator(),
      this.warningValidator(this.digitNameValidator()),
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

  digitNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '123456789') {
        return { diginName: { value: 'digitFormat' } };
      }
      return null;
    };
  }

  warningValidator(validatorFn: ValidatorFn): ValidatorFn {
    const warningFn = (
      control: AbstractControlWarning
    ): ValidationErrors | null => {
      control.warnings ??= new BehaviorSubject<WarningMessageType>(null);
      var result = validatorFn(control);
      if (result !== null) {
        control.warnings.next(result);
      } else {
        control.warnings.next(control.warnings.value);
      }
      return null;
    };
    return warningFn as ValidatorFn;
  }
}

export interface AbstractControlWarning extends AbstractControl {
  warnings: BehaviorSubject<WarningMessageType>;
}

export interface WarningFn {
  (control: AbstractControlWarning): ValidationErrors | null;
}
