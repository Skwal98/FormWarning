import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningFormInfoComponent } from './warning-form-info.component';

describe('WarningFormInfoComponent', () => {
  let component: WarningFormInfoComponent;
  let fixture: ComponentFixture<WarningFormInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningFormInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningFormInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
