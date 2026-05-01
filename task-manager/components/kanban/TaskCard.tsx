'use client';

import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { CalendarDays, RefreshCw, Pencil, Trash2 } from 'lucide-react';
import { cn, getDueDateInfo } from '@/lib/utils';
import { PRIORITY_CONFIG } from '@/lib/types';
import type { Task } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, index, onEdit, onDelete }: TaskCardProps) {
  const [hovered, setHovered] = useState(false);
  const dueDateInfo = getDueDateInfo(task.due_date);
  const priority = PRIORITY_CONFIG[task.priority];

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={cn(
            'group relative rounded-lg border border-border bg-card p-3 shadow-sm transition-all select-none',
            snapshot.isDragging && 'shadow-lg ring-2 ring-ring rotate-1 scale-105',
            !snapshot.isDragging && 'hover:shadow-md hover:border-ring/50'
          )}
        >
          {/* ヘッダー: タイトル + アクションボタン */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-sm font-medium leading-snug break-words flex-1">
              {task.title}
            </p>
            {hovered && !snapshot.isDragging && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="編集"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`「${task.title}」を削除してもいいがんすか？`)) {
                      onDelete(task.id);
                    }
                  }}
                  className="p-1 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                  title="削除"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            )}
          </div>

          {/* 説明 */}
          {task.description && (
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* ラベル */}
          {task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {task.labels.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* フッター: 優先度 + 期日 + 繰り返し */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
                priority.bg,
                priority.color
              )}
            >
              {priority.label}
            </span>

            {dueDateInfo && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-xs',
                  dueDateInfo.color
                )}
              >
                <CalendarDays size={11} />
                {dueDateInfo.label}
              </span>
            )}

            {task.is_recurring && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <RefreshCw size={11} />
                毎日
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
