import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { AbstractControlWarning } from '../app.component';

@Component({
  selector: 'app-warning-form-info',
  templateUrl: './warning-form-info.component.html',
  styleUrls: ['./warning-form-info.component.scss'],
})
export class WarningFormInfoComponent implements OnInit {
  @Input() controlName!: string;

  constructor(private _formContainer: ControlContainer) {}

  public get warning(): string {
    const warnings = (
      this._formContainer.control?.get(
        this.controlName
      ) as AbstractControlWarning
    )?.warnings;
    return JSON.stringify(warnings);
  }

  ngOnInit(): void {}
}
