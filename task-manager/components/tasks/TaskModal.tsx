'use client';

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task, TaskStatus, TaskPriority } from '@/lib/types';

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  defaultStatus?: TaskStatus;
  onSubmit: (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
}

const defaultForm = {
  title: '',
  description: '',
  status: 'todo' as TaskStatus,
  priority: 'medium' as TaskPriority,
  labelsInput: '',
  due_date: '',
  is_recurring: false,
  recurrence_type: 'daily' as 'daily' | null,
  position: 0,
};

export function TaskModal({
  open,
  onOpenChange,
  task,
  defaultStatus,
  onSubmit,
}: TaskModalProps) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description ?? '',
        status: task.status,
        priority: task.priority,
        labelsInput: task.labels.join(', '),
        due_date: task.due_date ?? '',
        is_recurring: task.is_recurring,
        recurrence_type: task.recurrence_type ?? 'daily',
        position: task.position,
      });
    } else {
      setForm({ ...defaultForm, status: defaultStatus ?? 'todo' });
    }
  }, [task, defaultStatus, open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim() || null,
      status: form.status,
      priority: form.priority,
      labels: form.labelsInput
        .split(',')
        .map((l) => l.trim())
        .filter(Boolean),
      due_date: form.due_date || null,
      is_recurring: form.is_recurring,
      recurrence_type: form.is_recurring ? 'daily' : null,
      position: form.position,
    });
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-card text-card-foreground rounded-xl shadow-2xl border border-border p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-semibold">
              {task ? 'タスクを編集' : 'タスクを追加'}
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 hover:bg-muted transition-colors">
              <X size={18} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* タイトル */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                タイトル <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="タスクのタイトル"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            {/* 説明 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">説明</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="詳細な説明（任意）"
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* ステータス */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">ステータス</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as TaskStatus })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="todo">未着手</option>
                  <option value="in_progress">進行中</option>
                  <option value="done">完了</option>
                </select>
              </div>

              {/* 優先度 */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">優先度</label>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      priority: e.target.value as TaskPriority,
                    })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
              </div>
            </div>

            {/* 期日 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">期日</label>
              <input
                type="date"
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* ラベル */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                ラベル
                <span className="text-muted-foreground font-normal ml-1 text-xs">
                  (カンマ区切りで複数入力)
                </span>
              </label>
              <input
                type="text"
                value={form.labelsInput}
                onChange={(e) =>
                  setForm({ ...form, labelsInput: e.target.value })
                }
                placeholder="例: 仕事, 重要, 調査"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* 繰り返し */}
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={form.is_recurring}
                onClick={() =>
                  setForm({ ...form, is_recurring: !form.is_recurring })
                }
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0',
                  form.is_recurring
                    ? 'bg-primary border-primary'
                    : 'border-input bg-background'
                )}
              >
                {form.is_recurring && (
                  <svg
                    className="w-3 h-3 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <div className="flex items-center gap-2">
                <RefreshCw size={15} className="text-muted-foreground" />
                <span className="text-sm font-medium">毎日繰り返す</span>
              </div>
            </div>

            {/* ボタン */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
              >
                {task ? '更新' : '追加'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
