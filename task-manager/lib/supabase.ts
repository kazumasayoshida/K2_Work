import { createClient } from '@supabase/supabase-js';
import type { Task } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('position', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createTask(
  task: Omit<Task, 'id' | 'created_at' | 'updated_at'>
): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>
): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw error;
}

export async function generateDailyRecurringTasks(): Promise<void> {
  const today = new Date().toISOString().split('T')[0];

  const { data: recurringTasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('is_recurring', true)
    .eq('recurrence_type', 'daily');

  if (error || !recurringTasks) return;

  const { data: existingToday } = await supabase
    .from('tasks')
    .select('title')
    .eq('due_date', today)
    .eq('is_recurring', true);

  const existingTitles = new Set((existingToday ?? []).map((t) => t.title));

  const tasksToCreate = recurringTasks
    .filter((t) => !existingTitles.has(t.title))
    .map(({ id: _id, created_at: _ca, updated_at: _ua, due_date: _dd, status: _s, ...rest }) => ({
      ...rest,
      status: 'todo' as const,
      due_date: today,
    }));

  if (tasksToCreate.length > 0) {
    await supabase.from('tasks').insert(tasksToCreate);
  }
}
