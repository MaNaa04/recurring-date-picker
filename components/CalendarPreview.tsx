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
  isToday,
  isBefore,
  isAfter,
} from 'date-fns';

// --- Helper function to generate the recurring dates (IMPROVED) ---
const generateRecurringDates = (
  state: ReturnType<typeof useRecurrenceStore.getState>
) => {
  const { recurrenceType, interval, daysOfWeek, monthlyConfig, startDate, endDate } = state;
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
            const lastDate = recurringDates[recurringDates.length - 1];
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
            if (recurringDates.length > 1) {
              const jump = interval > 1 ? interval - 1 : 0;
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

// --- The Calendar Component (Enhanced UI) ---
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

  // Get current month's recurring dates for stats
  const currentMonthRecurring = recurringDates.filter(date => 
    isSameMonth(date, displayDate)
  );

  return (
    <div className="space-y-6">
      {/* Calendar Header with Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={prevMonth} 
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-200 hover:scale-105"
        >
          <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">
            {format(displayDate, 'MMMM yyyy')}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {currentMonthRecurring.length} recurring {currentMonthRecurring.length === 1 ? 'date' : 'dates'}
          </p>
        </div>
        
        <button 
          onClick={nextMonth} 
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-200 hover:scale-105"
        >
          <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-gray-750 rounded-xl p-4 shadow-lg border border-gray-600">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center py-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month start */}
          {Array.from({ length: startingDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-12" />
          ))}
          
          {/* Days of the month */}
          {daysInMonth.map((day) => {
            const isRecurring = recurringDates.some(d => isSameDay(d, day));
            const isTodayDate = isToday(day);
            const isPastDate = isBefore(day, new Date()) && !isTodayDate;
            const isStartDate = isSameDay(day, state.startDate);
            const isEndDate = state.endDate && isSameDay(day, state.endDate);

            return (
              <div
                key={day.toString()}
                className={`
                  relative flex items-center justify-center h-12 w-full rounded-lg text-sm font-medium
                  transition-all duration-200 cursor-pointer group
                  ${isRecurring 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 ring-2 ring-blue-400/30' 
                    : isPastDate
                    ? 'text-gray-500 hover:bg-gray-700/50'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                  ${isTodayDate && !isRecurring ? 'bg-gray-600 ring-2 ring-gray-400 text-white' : ''}
                  ${isStartDate && !isRecurring ? 'ring-2 ring-green-400 bg-green-500/20' : ''}
                  ${isEndDate && !isRecurring ? 'ring-2 ring-red-400 bg-red-500/20' : ''}
                `}
              >
                <span className="relative z-10">
                  {format(day, 'd')}
                </span>
                
                {/* Special indicators */}
                {isRecurring && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400/20 to-transparent" />
                )}
                
                {isStartDate && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800" />
                )}
                
                {isEndDate && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-gray-800" />
                )}
                
                {isTodayDate && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
          <span className="text-gray-400">Recurring dates</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-600 rounded-full ring-2 ring-gray-400"></div>
          <span className="text-gray-400">Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-gray-400">Start date</span>
        </div>
        {state.endDate && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-gray-400">End date</span>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-gray-750 rounded-lg p-4 border border-gray-600">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Total occurrences:</span>
            <span className="ml-2 font-medium text-white">{recurringDates.length}</span>
          </div>
          <div>
            <span className="text-gray-400">This month:</span>
            <span className="ml-2 font-medium text-white">{currentMonthRecurring.length}</span>
          </div>
        </div>
        {recurringDates.length > 0 && (
          <div className="mt-2 text-sm">
            <span className="text-gray-400">Next occurrence:</span>
            <span className="ml-2 font-medium text-blue-400">
              {format(recurringDates.find(date => isAfter(date, new Date())) || recurringDates[0], 'MMM d, yyyy')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPreview;