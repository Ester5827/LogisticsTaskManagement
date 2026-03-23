import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private initialTasks: Task[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `משימה לוגיסטית ${i + 1}`,
    status: 'Pending'
  }));

  private tasksSubject = new BehaviorSubject<Task[]>(this.initialTasks);
  private isConnectedSubject = new BehaviorSubject<boolean>(true);

  tasks$ = this.tasksSubject.asObservable();
  isConnected$ = this.isConnectedSubject.asObservable();

  constructor() {
    this.startMockWebSocket();
  }

  private startMockWebSocket() {
    interval(2000).subscribe(() => {
      // 1. ניצור עותק חדש של המערך הנוכחי
      const currentTasks = [...this.tasksSubject.value];

      // 2. נבחר אינדקס רנדומלי
      const randomIndex = Math.floor(Math.random() * currentTasks.length);

      // 3. ניצור עותק חדש של האובייקט הספציפי (חשוב מאוד!)
      currentTasks[randomIndex] = {
        ...currentTasks[randomIndex],
        status: 'Updated'
      };

      // 4. נדחוף את המערך החדש ל-Subject
      this.tasksSubject.next(currentTasks);
    });
  }
}
