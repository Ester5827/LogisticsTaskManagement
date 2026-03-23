import { Injectable } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor() { }

  /**
   * מדמה הזרמת נתונים של רכבים (דרישה של חלק 3)
   */
  getUpdates(): Observable<any[]> {
    // מחזיר מערך דמי שמתעדכן כל 3 שניות לצורך הסימולציה
    return interval(3000).pipe(
      map(tick => [
        { id: 1, name: 'Vehicle A' },
        { id: tick, name: 'Vehicle B' }
      ])
    );
  }
}
