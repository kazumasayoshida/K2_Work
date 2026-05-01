export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  labels: string[];
  due_date: string | null;
  is_recurring: boolean;
  recurrence_type: 'daily' | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export type TaskFormData = Omit<Task, 'id' | 'created_at' | 'updated_at'>;

export const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: '未着手' },
  { id: 'in_progress', label: '進行中' },
  { id: 'done', label: '完了' },
];

export const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; color: string; bg: string }
> = {
  high: {
    label: '高',
    color: 'text-red-700 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
  },
  medium: {
    label: '中',
    color: 'text-yellow-700 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
  },
  low: {
    label: '低',
    color: 'text-green-700 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
};
