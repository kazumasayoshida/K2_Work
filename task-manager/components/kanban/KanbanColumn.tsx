'use client';

import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '@/lib/types';

interface KanbanColumnProps {
  id: TaskStatus;
  label: string;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const COLUMN_STYLE: Record<TaskStatus, string> = {
  todo: 'border-t-slate-400',
  in_progress: 'border-t-blue-500',
  done: 'border-t-green-500',
};

const COUNT_STYLE: Record<TaskStatus, string> = {
  todo: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  done: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};

export function KanbanColumn({
  id,
  label,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: KanbanColumnProps) {
  return (
    <div
      className={cn(
        'flex flex-col w-80 shrink-0 rounded-xl border border-border bg-muted/30 border-t-4',
        COLUMN_STYLE[id]
      )}
    >
      {/* カラムヘッダー */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm">{label}</h2>
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold min-w-[1.5rem]',
              COUNT_STYLE[id]
            )}
          >
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(id)}
          className="rounded-md p-1.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title="タスクを追加"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* タスクリスト */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex flex-col gap-2 flex-1 min-h-[120px] px-3 pb-3 transition-colors rounded-b-xl',
              snapshot.isDraggingOver && 'bg-accent/50'
            )}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-col items-center justify-center flex-1 py-8 text-muted-foreground/50">
                <p className="text-xs">タスクなし</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
