import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { WarningMessageType } from '../warning-form-info/warning-form-info.component';

export function warningValidators(validatorsFn: ValidatorFn[]): ValidatorFn {
  const warningFn = (
    control: AbstractControlWarning
  ): ValidationErrors | null => {
    control.warnings ??= new BehaviorSubject<WarningMessageType>(null);
    var result = validatorsFn.map((x) => x(control)).filter((x) => x !== null);
    if (result !== null && result.length > 0) {
      let obj = {};
      for (const key of result) {
        obj = { ...obj, ...key };
      }
      control.warnings.next(obj);
    } else {
      control.warnings.next(null);
    }
    return null;
  };
  return warningFn as ValidatorFn;
}

export interface AbstractControlWarning extends AbstractControl {
  warnings: BehaviorSubject<WarningMessageType>;
}

export interface WarningFn {
  (control: AbstractControlWarning): ValidationErrors | null;
}
