// lib/dateLogic.ts
import {
  addDays, addWeeks, addMonths, addYears, startOfMonth,
  setDate, getDay, startOfDay
} from 'date-fns';
import { useRecurrenceStore } from '@/store/useRecurrenceStore';

export const generateRecurringDates = (
  state: ReturnType<typeof useRecurrenceStore.getState>
) => {
  const { recurrenceType, interval, daysOfWeek, monthlyConfig, startDate, endDate } = state;
  const recurringDates: Date[] = [];
  
  if (!startDate) return [];

  let cursor = startOfDay(startDate);

  // Loop a sufficient number of times to find occurrences in a reasonable future timeframe.
  for (let i = 0; recurringDates.length < 200; i++) {
    let potentialDate: Date | null = null;

    if (i > 0) {
      // For subsequent occurrences, we advance the cursor from the last found date.
      const lastDate = recurringDates[recurringDates.length - 1];
      switch (recurrenceType) {
        case 'daily':
          cursor = addDays(lastDate, interval);
          break;
        case 'weekly':
          // For weekly, we just search from the day after the last date found.
          cursor = addDays(lastDate, 1);
          break;
        case 'monthly':
          // For monthly, we advance by the interval from the month of the last found date.
          cursor = addMonths(lastDate, interval);
          break;
        case 'yearly':
          cursor = addYears(lastDate, interval);
          break;
      }
    }

    switch (recurrenceType) {
      case 'daily':
        potentialDate = cursor;
        break;

      case 'weekly':
        if (daysOfWeek.length === 0) return []; // Stop if no days are selected
        
        let searchDate = cursor;
        while (true) {
          if (daysOfWeek.includes(getDay(searchDate))) {
            // If it's not the first date, ensure the interval is respected
            if (recurringDates.length > 0) {
               const lastDate = recurringDates[recurringDates.length - 1];
               const weeksPassed = Math.floor((searchDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
               if (weeksPassed < interval -1 ) {
                   searchDate = addWeeks(searchDate, interval - 1 - weeksPassed);
                   continue; // Re-evaluate the new searchDate
               }
            }
            potentialDate = searchDate;
            break; // Found a valid date
          }
          searchDate = addDays(searchDate, 1);
        }
        break;

      case 'monthly':
        const monthCursor = i === 0 ? startDate : cursor;
        if (monthlyConfig.type === 'day_of_month') {
          potentialDate = setDate(monthCursor, monthlyConfig.day);
        } else { // 'day_of_week'
          const firstDayOfMonth = startOfMonth(monthCursor);
          let firstMatchingWeekday = firstDayOfMonth;
          while (getDay(firstMatchingWeekday) !== monthlyConfig.day) {
            firstMatchingWeekday = addDays(firstMatchingWeekday, 1);
          }
          potentialDate = addWeeks(firstMatchingWeekday, monthlyConfig.week - 1);
        }
        break;

      case 'yearly':
        potentialDate = addYears(startDate, i * interval);
        break;
    }

    if (!potentialDate) break;

    // Check against end date
    if (endDate && potentialDate > endDate) {
      break; // Stop generating dates
    }

    // Add if it's on or after the start date and not already in the list
    if (potentialDate >= startOfDay(startDate) && !recurringDates.some(d => d.getTime() === potentialDate!.getTime())) {
       recurringDates.push(potentialDate);
    }
    
    // Safety break
    if(potentialDate.getFullYear() > startDate.getFullYear() + 10) break;
  }
  return recurringDates;
}