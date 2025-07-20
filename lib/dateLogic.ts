// lib/dateLogic.ts
import {
  addDays,
  addYears,
  startOfMonth,
  setDate,
  getDay,
  startOfDay,
  addWeeks,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from 'date-fns';
import type { RecurrenceState } from '@/store/useRecurrenceStore';

export const generateRecurringDates = (state: RecurrenceState) => {
  // *** DEBUGGING LOG #1 ***
  // This will show us the exact state the function receives right before it runs.
//  console.log("--- Running generateRecurringDates with State ---", state);

  const { recurrenceType, interval, daysOfWeek, monthlyConfig, startDate, endDate } = state;
  const recurringDates: Date[] = [];
  
  if (!startDate) return [];

  const sDate = startOfDay(startDate);
  const finalDate = addYears(sDate, 5);
  let cursor = sDate;

  while (cursor <= finalDate) {
    // *** DEBUGGING LOG #2 ***
    // This will print every date the loop checks. If it freezes, the last date printed is our clue.
    // console.log("Checking date:", cursor.toISOString());

    let shouldAdd = false;

    // ... (The rest of the logic is identical to the previous version)
    switch (recurrenceType) {
      case 'daily': {
        const daysDiff = differenceInCalendarDays(cursor, sDate);
        if (daysDiff >= 0 && daysDiff % interval === 0) shouldAdd = true;
        break;
      }
      case 'weekly': {
        if (daysOfWeek.includes(getDay(cursor))) {
          const weeksDiff = differenceInCalendarWeeks(cursor, sDate, { weekStartsOn: 0 });
          if (weeksDiff >= 0 && weeksDiff % interval === 0) shouldAdd = true;
        }
        break;
      }
      case 'monthly': {
        const monthsDiff = differenceInCalendarMonths(cursor, sDate);
        if (monthsDiff >= 0 && monthsDiff % interval === 0) {
          if (monthlyConfig.type === 'day_of_month') {
            if (cursor.getDate() === monthlyConfig.day) shouldAdd = true;
          } else {
            const targetDayOfWeek = monthlyConfig.day >= 0 && monthlyConfig.day <= 6 ? monthlyConfig.day : 1;
            const weekOfMonth = Math.floor((cursor.getDate() - 1) / 7) + 1;
            if (getDay(cursor) === targetDayOfWeek && weekOfMonth === monthlyConfig.week) shouldAdd = true;
          }
        }
        break;
      }
      case 'yearly': {
        const yearsDiff = differenceInCalendarYears(cursor, sDate);
        if (yearsDiff >= 0 && yearsDiff % interval === 0) {
          if (cursor.getMonth() === sDate.getMonth() && cursor.getDate() === sDate.getDate()) shouldAdd = true;
        }
        break;
      }
    }

    if (shouldAdd) {
      if (endDate && cursor > endDate) break;
      recurringDates.push(cursor);
    }
    
    cursor = addDays(cursor, 1);
  }

  return recurringDates;
};