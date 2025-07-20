// components/CalendarPreview.tsx
'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';
import { useState, useMemo } from 'react';
import {
  addMonths, startOfMonth, endOfMonth, eachDayOfInterval, format,
  isSameDay, getDay, isToday
} from 'date-fns';

// NOTE: You would need to export this function from its test file or move it into a separate utility file.
// For simplicity here, I'm assuming it's accessible.
import { generateRecurringDates } from '@/lib/dateLogic';

const CalendarPreview = () => {
  const state = useRecurrenceStore();
  const [displayDate, setDisplayDate] = useState(new Date());

  // Memoize the recurring dates calculation for performance
  const recurringDates = useMemo(() => generateRecurringDates(state), [state]);

  const monthStart = startOfMonth(displayDate);
  const monthEnd = endOfMonth(displayDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startingDayIndex = getDay(monthStart);

  const prevMonth = () => setDisplayDate(addMonths(displayDate, -1));
  const nextMonth = () => setDisplayDate(addMonths(displayDate, 1));

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {format(displayDate, 'MMMM yyyy')}
        </span>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {/* Day of the week headers */}
       {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={day + index} className="font-bold text-gray-400 dark:text-gray-500 py-2">{day}</div>
        ))}

        {/* Empty cells for padding */}
        {Array.from({ length: startingDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Date cells */}
        {daysInMonth.map((day) => {
          const isRecurring = recurringDates.some(d => isSameDay(d, day));
          return (
            <div
              key={day.toString()}
              className={`flex items-center justify-center h-10 w-10 rounded-full font-medium ${
                isRecurring 
                  ? 'bg-[#00A99D] text-white' // Salesku: Highlight recurring dates with Primary Teal
                  : isToday(day) 
                  ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100' // Highlight today
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPreview;