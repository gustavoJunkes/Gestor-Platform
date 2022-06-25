import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliationReportComponent } from './avaliation-report.component';

describe('AvaliationReportComponent', () => {
  let component: AvaliationReportComponent;
  let fixture: ComponentFixture<AvaliationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
