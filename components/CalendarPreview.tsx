// components/CalendarPreview.tsx
'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';
import { useState, useMemo } from 'react';
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  getDay,
  getDate,
  setMonth,
  getWeekOfMonth,
  isSameMonth,
  startOfDay,
  setDate,
} from 'date-fns';

// --- Helper function to generate the recurring dates (IMPROVED) ---
const generateRecurringDates = (
  state: ReturnType<typeof useRecurrenceStore.getState>
) => {
  const { recurrenceType, interval, daysOfWeek, monthlyConfig, startDate,endDate } = state;
  const recurringDates: Date[] = [];
  let cursorDate = startOfDay(startDate);

  // Generate up to 200 future occurrences to display
  for (let i = 0; i < 200; i++) {
     let potentialDate: Date | null = null;

    switch (recurrenceType) {
      case 'daily':
        if (i === 0) {
          recurringDates.push(cursorDate);
        } else {
          cursorDate = addDays(recurringDates[recurringDates.length - 1], interval);
          recurringDates.push(cursorDate);
        }
        break;

      case 'weekly': {
        if (daysOfWeek.length === 0) return []; // Don't run if no days are selected

        let searchDate = recurringDates.length > 0
          ? addDays(recurringDates[recurringDates.length - 1], 1)
          : cursorDate;

        // Find the next valid day
        while (true) {
          if (daysOfWeek.includes(getDay(searchDate))) {
            const lastDate = recurringDates[recurringDates.length -1];
            // If it's not the first date, check if the interval is met
            if (lastDate) {
              const weekOfLastDate = getWeekOfMonth(lastDate);
              const weekOfSearchDate = getWeekOfMonth(searchDate);
              const sameMonth = isSameMonth(lastDate, searchDate);

              if (sameMonth && weekOfLastDate === weekOfSearchDate) {
                 searchDate = addDays(searchDate, 1);
                 continue;
              }
            }
            recurringDates.push(searchDate);
            // After finding a date, jump forward by the interval weeks
            if(recurringDates.length > 1){
               const jump = interval > 1 ? interval -1 : 0;
               searchDate = addWeeks(searchDate, jump);
            }
            break;
          }
          searchDate = addDays(searchDate, 1);
        }
        break;
      }

      case 'monthly': {
        let monthCursor = addMonths(startDate, i * interval);

        if (monthlyConfig.type === 'day_of_month') {
          let potentialDate = setDate(monthCursor, monthlyConfig.day);
          recurringDates.push(potentialDate);
        } else {
          const firstDayOfMonth = startOfMonth(monthCursor);
          let firstMatchingWeekday = firstDayOfMonth;
          while (getDay(firstMatchingWeekday) !== monthlyConfig.day) {
            firstMatchingWeekday = addDays(firstMatchingWeekday, 1);
          }
          let potentialDate = addWeeks(firstMatchingWeekday, monthlyConfig.week - 1);
          recurringDates.push(potentialDate);
        }
        break;
      }
      case 'yearly':
        if (i === 0) {
          recurringDates.push(cursorDate);
        } else {
          cursorDate = addYears(recurringDates[recurringDates.length - 1], interval);
          recurringDates.push(cursorDate);
        }
        break;
    }
     potentialDate = recurringDates[recurringDates.length - 1];

    // *** ADD THIS CHECK ***
    // If we have an end date and the new date is past it, stop.
    if (potentialDate && endDate && potentialDate > endDate) {
      recurringDates.pop(); // Remove the date that was too far
      break; // Exit the loop
    }
    // Safety break to prevent very long-running loops in edge cases
    if (recurringDates.length > 0 && recurringDates[recurringDates.length - 1].getFullYear() > startDate.getFullYear() + 10) {
      break;
    }
  }
  return recurringDates.map(d => startOfDay(d));
};


// --- The Calendar Component (No changes below this line) ---
const CalendarPreview = () => {
  const state = useRecurrenceStore();
  const [displayDate, setDisplayDate] = useState(new Date());

  const recurringDates = useMemo(() => generateRecurringDates(state), [state]);

  const monthStart = startOfMonth(displayDate);
  const monthEnd = endOfMonth(displayDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startingDayIndex = getDay(monthStart);

  const prevMonth = () => setDisplayDate(addMonths(displayDate, -1));
  const nextMonth = () => setDisplayDate(addMonths(displayDate, 1));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-md hover:bg-gray-700">&lt;</button>
        <span className="text-lg font-semibold">
          {format(displayDate, 'MMMM yyyy')}
        </span>
        <button onClick={nextMonth} className="p-2 rounded-md hover:bg-gray-700">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-bold text-gray-400">{day}</div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {daysInMonth.map((day) => {
          const isRecurring = recurringDates.some(d => isSameDay(d, day));
          return (
            <div
              key={day.toString()}
              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                isRecurring ? 'bg-blue-500 text-white' : ''
              } ${isSameDay(day, new Date()) && !isRecurring ? 'bg-gray-700' : ''}`}
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