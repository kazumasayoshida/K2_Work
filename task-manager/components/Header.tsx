'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, CheckSquare, Plus } from 'lucide-react';
import { useState } from 'react';
import { TaskModal } from './tasks/TaskModal';
import { useCreateTask, useTasks } from '@/hooks/useTasks';
import type { Task } from '@/lib/types';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const createTask = useCreateTask();
  const { data: tasks = [] } = useTasks();

  function handleSubmit(data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    const count = tasks.filter((t) => t.status === data.status).length;
    createTask.mutate({ ...data, position: count });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare size={22} className="text-primary" />
          <h1 className="text-lg font-bold tracking-tight">タスク管理</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={15} />
            タスクを追加
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-md p-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="テーマ切り替え"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleSubmit}
      />
    </header>
  );
}
