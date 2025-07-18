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
    <div className="mt-4 space-y-4 text-sm">
      <div>
        <label htmlFor="start-date" className="block mb-1 font-semibold">Start Date</label>
        <input
          type="date"
          id="start-date"
          value={formatDateForInput(startDate)}
          onChange={(e) => setStartDate(parseISO(e.target.value))}
          className="w-full rounded-md bg-gray-700 p-2"
        />
      </div>
      <div>
        <label htmlFor="end-date" className="block mb-1 font-semibold">End Date (Optional)</label>
        <input
          type="date"
          id="end-date"
          value={formatDateForInput(endDate)}
          onChange={(e) => setEndDate(e.target.value ? parseISO(e.target.value) : null)}
          className="w-full rounded-md bg-gray-700 p-2"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;