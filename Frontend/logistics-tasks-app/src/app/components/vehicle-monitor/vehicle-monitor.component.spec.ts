import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMonitorComponent } from './vehicle-monitor.component';

describe('VehicleMonitorComponent', () => {
  let component: VehicleMonitorComponent;
  let fixture: ComponentFixture<VehicleMonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleMonitorComponent]
    });
    fixture = TestBed.createComponent(VehicleMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
