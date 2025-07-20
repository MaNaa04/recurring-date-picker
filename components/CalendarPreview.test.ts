// components/CalendarPreview.test.ts
import { generateRecurringDates } from '@/lib/dateLogic';
import { startOfDay } from 'date-fns';
import type { RecurrenceState } from '@/store/useRecurrenceStore'; // Import the main state type

// Use Partial<RecurrenceState> to replace 'any' for type safety
const createMockState = (overrides: Partial<RecurrenceState>): RecurrenceState => ({
  startDate: startOfDay(new Date('2025-08-01')),
  endDate: null,
  recurrenceType: 'daily',
  interval: 1,
  daysOfWeek: [],
  monthlyConfig: { type: 'day_of_month', day: 1, week: 1 },
  // Mock actions
  setStartDate: () => {},
  setRecurrenceType: () => {},
  setInterval: () => {},
  toggleDayOfWeek: () => {},
  setMonthlyConfig: () => {},
  setEndDate: () => {},
  ...overrides,
});

describe('generateRecurringDates', () => {
  it('should generate correct dates for a simple daily recurrence', () => {
    const mockState = createMockState({
      recurrenceType: 'daily',
      interval: 3,
    });

    const dates = generateRecurringDates(mockState);

    const expectedDates = [
      new Date('2025-08-01'),
      new Date('2025-08-04'),
      new Date('2025-08-07'),
      new Date('2025-08-10'),
      new Date('2025-08-13'),
    ].map(d => startOfDay(d));

    expect(dates.slice(0, 5)).toEqual(expectedDates);
  });
});