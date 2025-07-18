// components/DateRangePicker.tsx
'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';
import { format, parseISO } from 'date-fns';

const DateRangePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useRecurrenceStore();

  // Helper to format date for input[type="date"] which requires 'yyyy-MM-dd'
  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2">
        <label htmlFor="start-date" className="block font-semibold text-slate-700 dark:text-slate-300">Start Date</label>
        <input
          type="date"
          id="start-date"
          value={formatDateForInput(startDate)}
          onChange={(e) => setStartDate(parseISO(e.target.value))}
          className="w-full rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-3 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="end-date" className="block font-semibold text-slate-700 dark:text-slate-300">
          End Date 
          <span className="text-slate-500 dark:text-slate-400 font-normal">(Optional)</span>
        </label>
        <input
          type="date"
          id="end-date"
          value={formatDateForInput(endDate)}
          onChange={(e) => setEndDate(e.target.value ? parseISO(e.target.value) : null)}
          className="w-full rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-3 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;