export interface Task {
  id: number;
  title: string;
  status: 'Pending' | 'Updated' | 'Completed';
}
