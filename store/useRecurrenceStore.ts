import { create } from 'zustand';

// Define the types for our state
type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface MonthlyConfig {
  type: 'day_of_month' | 'day_of_week'; // e.g., on the 15th OR on the 3rd Tuesday
  day: number; // The date (1-31) or the day of the week (0-6 for Sun-Sat)
  week: number; // e.g., the 1st, 2nd, 3rd, 4th week of the month
}

interface RecurrenceState {
  startDate: Date;
  recurrenceType: RecurrenceType;
  interval: number; // Every X days/weeks/months/years
  daysOfWeek: number[]; // For weekly recurrence (0 for Sun, 1 for Mon, etc.)
  monthlyConfig: MonthlyConfig;
  endDate: Date | null;

  // Actions to update the state
  setStartDate: (date: Date) => void;
  setRecurrenceType: (type: RecurrenceType) => void;
  setInterval: (interval: number) => void;
  toggleDayOfWeek: (day: number) => void;
  setMonthlyConfig: (config: MonthlyConfig) => void;
  setEndDate: (date: Date | null) => void;
}

// Create the store
export const useRecurrenceStore = create<RecurrenceState>((set) => ({
  // Initial default values
  startDate: new Date(),
  recurrenceType: 'weekly',
  interval: 1,
  daysOfWeek: [new Date().getDay()], // Default to today's day of the week
  monthlyConfig: { type: 'day_of_month', day: new Date().getDate(), week: 1 },
  endDate: null,

  // Implement the actions
  setStartDate: (date) => set({ startDate: date }),
  setRecurrenceType: (type) => set({ recurrenceType: type, interval: 1 }), // Reset interval on type change
  setInterval: (interval) => set({ interval: Math.max(1, interval) }), // Ensure interval is at least 1
  toggleDayOfWeek: (day) =>
    set((state) => {
      const daysOfWeek = state.daysOfWeek.includes(day)
        ? state.daysOfWeek.filter((d) => d !== day) // Remove day
        : [...state.daysOfWeek, day]; // Add day
      return { daysOfWeek };
    }),
  setMonthlyConfig: (config) => set({ monthlyConfig: config }),
  setEndDate: (date) => set({ endDate: date }),
}));