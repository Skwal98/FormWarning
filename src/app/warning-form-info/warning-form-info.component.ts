import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractControlWarning } from '../utils/warning-form.utils';

@Component({
  selector: 'app-warning-form-info',
  templateUrl: './warning-form-info.component.html',
  styleUrls: ['./warning-form-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningFormInfoComponent implements OnInit {
  @Input() controlName!: string;

  constructor(
    private _formContainer: ControlContainer,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._control?.statusChanges.subscribe((_) => this._cd.detectChanges());
  }

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
