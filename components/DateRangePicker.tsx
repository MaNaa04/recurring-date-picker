// components/DateRangePicker.tsx
'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';
import { format, parseISO } from 'date-fns';

const DateRangePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useRecurrenceStore();

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <div className="space-y-4 text-sm">
      <div>
        <label htmlFor="start-date" className="block mb-2 font-semibold text-gray-600 dark:text-gray-300">Start Date</label>
        <input
          type="date"
          id="start-date"
          value={formatDateForInput(startDate)}
          onChange={(e) => setStartDate(parseISO(e.target.value))}
          className="w-full rounded-lg bg-gray-100 dark:bg-gray-700 p-3 font-medium text-gray-800 dark:text-white border-transparent focus:ring-2 focus:ring-[#00A99D]"
        />
      </div>
      <div>
        <label htmlFor="end-date" className="block mb-2 font-semibold text-gray-600 dark:text-gray-300">
          End Date <span className="text-gray-500 font-normal">(Optional)</span>
        </label>
        <input
          type="date"
          id="end-date"
          value={formatDateForInput(endDate)}
          onChange={(e) => setEndDate(e.target.value ? parseISO(e.target.value) : null)}
          className="w-full rounded-lg bg-gray-100 dark:bg-gray-700 p-3 font-medium text-gray-800 dark:text-white border-transparent focus:ring-2 focus:ring-[#00A99D]"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;