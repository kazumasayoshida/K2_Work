'use client';

import { useEffect } from 'react';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { generateDailyRecurringTasks } from '@/lib/supabase';

export default function Home() {
  useEffect(() => {
    generateDailyRecurringTasks().catch(console.error);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <KanbanBoard />
    </div>
  );
}
