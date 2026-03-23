import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // דרישה 2: אופטימיזציה למניעת רינדורים
})
export class DashboardComponent {
  tasks$ = this.taskService.tasks$;
  isConnected$ = this.taskService.isConnected$;

  constructor(private taskService: TaskService) { }

  updatedCount$ = this.tasks$.pipe(
    map(tasks => tasks.filter(t => t.status === 'Updated').length)
  );

  trackByFn(index: number, item: Task) {
    return item.id; // אופטימיזציה לביצועים
  }
}
