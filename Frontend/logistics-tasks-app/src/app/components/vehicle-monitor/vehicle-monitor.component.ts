/**
 * PART 3 - SECTION A: Memory Leak Fix
 * Issue: The original code lacked an unsubscription mechanism, causing a memory leak.
 * Fix: Implemented OnDestroy with Subject and takeUntil operator for proper cleanup.
 */

import { Component } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service'
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-vehicle-monitor',
  templateUrl: './vehicle-monitor.component.html',
  styleUrls: ['./vehicle-monitor.component.scss']
})
export class VehicleMonitorComponent {
  count: number = 0;
  // יצירת Subject שיאותת על השמדת הקומפוננטה
  private destroy$ = new Subject<void>();

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getUpdates()
      .pipe(
        // שימוש ב-takeUntil מבטיח שה-Subscription ייסגר אוטומטית
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          this.count = data.length;
        },
        error: (err) => console.error('Error fetching updates', err)
      });
  }

  ngOnDestroy() {
    // שליחת אות הסגירה וסגירת ה-Subject
    this.destroy$.next();
    this.destroy$.complete();
  }
}

