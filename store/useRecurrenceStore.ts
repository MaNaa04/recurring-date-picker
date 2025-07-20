
import { create } from 'zustand';


export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';


export interface MonthlyConfig {
  type: 'day_of_month' | 'day_of_week';
  day: number;
  week: number;
}

export interface RecurrenceState {
  startDate: Date;
  recurrenceType: RecurrenceType;
  interval: number;
  daysOfWeek: number[];
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
  daysOfWeek: [new Date().getDay()],
  monthlyConfig: { type: 'day_of_month', day: new Date().getDate(), week: 1 },
  endDate: null,

  // Implement the actions
  setStartDate: (date) => set({ startDate: date }),
  setRecurrenceType: (type) => set({ recurrenceType: type, interval: 1 }),
  setInterval: (interval) => set({ interval: Math.max(1, interval) }),
  toggleDayOfWeek: (day) =>
    set((state) => {
      const daysOfWeek = state.daysOfWeek.includes(day)
        ? state.daysOfWeek.filter((d) => d !== day)
        : [...state.daysOfWeek, day];
      return { daysOfWeek };
    }),
  setMonthlyConfig: (config) => set({ monthlyConfig: config }),
  setEndDate: (date) => set({ endDate: date }),
}));