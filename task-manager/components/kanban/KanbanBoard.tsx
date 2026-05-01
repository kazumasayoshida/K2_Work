'use client';

import { useState, useCallback } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { KanbanColumn } from './KanbanColumn';
import { TaskModal } from '../tasks/TaskModal';
import { useTasks, useUpdateTask, useCreateTask, useDeleteTask } from '@/hooks/useTasks';
import { COLUMNS } from '@/lib/types';
import type { Task, TaskStatus } from '@/lib/types';

export function KanbanBoard() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const updateTask = useUpdateTask();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo');

  const tasksByStatus = COLUMNS.reduce(
    (acc, col) => {
      acc[col.id] = tasks
        .filter((t) => t.status === col.id)
        .sort((a, b) => a.position - b.position);
      return acc;
    },
    {} as Record<TaskStatus, Task[]>
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      const newStatus = destination.droppableId as TaskStatus;
      updateTask.mutate({
        id: draggableId,
        updates: { status: newStatus, position: destination.index },
      });
    },
    [updateTask]
  );

  function openCreate(status: TaskStatus) {
    setEditingTask(null);
    setDefaultStatus(status);
    setModalOpen(true);
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleSubmit(
    data: Omit<Task, 'id' | 'created_at' | 'updated_at'>
  ) {
    if (editingTask) {
      updateTask.mutate({ id: editingTask.id, updates: data });
    } else {
      const columnTasks = tasksByStatus[data.status] ?? [];
      createTask.mutate({ ...data, position: columnTasks.length });
    }
  }

  function handleDelete(id: string) {
    deleteTask.mutate(id);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-destructive">
        <p>データの取得に失敗したっけ。Supabaseの設定を確認してくれっちゃ。</p>
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              tasks={tasksByStatus[col.id]}
              onAddTask={openCreate}
              onEditTask={openEdit}
              onDeleteTask={handleDelete}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
        onSubmit={handleSubmit}
      />
    </>
  );
}
