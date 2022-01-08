import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractControlWarning } from '../app.component';

@Component({
  selector: 'app-warning-form-info',
  templateUrl: './warning-form-info.component.html',
  styleUrls: ['./warning-form-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningFormInfoComponent {
  @Input() controlName!: string;

  constructor(private _formContainer: ControlContainer) {}

  public get warning(): Observable<WarningMessageType> {
    const warnings$ = (this._control as AbstractControlWarning)?.warnings;
    return warnings$?.asObservable();
  }

  public warningsMessages(obj: WarningMessageType): string[] {
    if (obj) {
      return Object.keys(obj).map<string>(
        (errorName) => `${errorName}.${obj[errorName].value}`
      );
    }
    return [];
  }

  public get errorMessages(): string[] | null {
    const errors = this._control?.errors;
    if (errors) {
      return Object.keys(errors).map<string>(
        (errorName) => `${errorName}.${errors[errorName].value}`
      );
    }
    return null;
  }

  private get _control(): AbstractControl | null | undefined {
    return this._formContainer.control?.get(this.controlName);
  }
}

export type WarningMessageType = { [key: string]: any } | null;
