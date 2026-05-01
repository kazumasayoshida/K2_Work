import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInCalendarDays, isToday, isTomorrow, isPast, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDueDateInfo(dueDate: string | null): {
  label: string;
  color: string;
} | null {
  if (!dueDate) return null;

  const date = parseISO(dueDate);
  const today = new Date();

  if (isToday(date)) {
    return { label: '今日', color: 'text-orange-600 dark:text-orange-400' };
  }
  if (isTomorrow(date)) {
    return { label: '明日', color: 'text-yellow-600 dark:text-yellow-400' };
  }
  if (isPast(date)) {
    const days = Math.abs(differenceInCalendarDays(date, today));
    return {
      label: `${days}日遅延`,
      color: 'text-red-600 dark:text-red-400',
    };
  }

  const days = differenceInCalendarDays(date, today);
  if (days <= 3) {
    return {
      label: `${days}日後`,
      color: 'text-yellow-600 dark:text-yellow-400',
    };
  }

  return {
    label: `${days}日後`,
    color: 'text-muted-foreground',
  };
}
