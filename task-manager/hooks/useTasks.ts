'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '@/lib/supabase';
import type { Task } from '@/lib/types';

const TASKS_KEY = ['tasks'];

export function useTasks() {
  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: fetchTasks,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Task> }) =>
      updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      await qc.cancelQueries({ queryKey: TASKS_KEY });
      const previous = qc.getQueryData<Task[]>(TASKS_KEY);
      qc.setQueryData<Task[]>(TASKS_KEY, (old) =>
        old?.map((t) => (t.id === id ? { ...t, ...updates } : t)) ?? []
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(TASKS_KEY, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: TASKS_KEY });
      const previous = qc.getQueryData<Task[]>(TASKS_KEY);
      qc.setQueryData<Task[]>(TASKS_KEY, (old) =>
        old?.filter((t) => t.id !== id) ?? []
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(TASKS_KEY, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}
