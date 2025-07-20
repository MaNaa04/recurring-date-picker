// components/CalendarPreview.test.ts
import { generateRecurringDates } from '@/lib/dateLogic'; // <-- Note the correct import path
import { startOfDay } from 'date-fns';

// A mock state for our tests
const createMockState = (overrides: any) => ({
  startDate: startOfDay(new Date('2025-08-01')),
  endDate: null,
  recurrenceType: 'daily',
  interval: 1,
  daysOfWeek: [],
  monthlyConfig: { type: 'day_of_month', day: 1, week: 1 },
  // These actions don't need to do anything for this logic test
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

    // We expect the first 5 dates to be Aug 1, 4, 7, 10, 13
    const expectedDates = [
      new Date('2025-08-01'),
      new Date('2025-08-04'),
      new Date('2025-08-07'),
      new Date('2025-08-10'),
      new Date('2025-08-13'),
    ].map(d => startOfDay(d));

    // Check if the first 5 generated dates match what we expect
    expect(dates.slice(0, 5)).toEqual(expectedDates);
  });
});