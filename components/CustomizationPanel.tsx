// components/CustomizationPanel.tsx
'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';

const CustomizationPanel = () => {
  const {
    recurrenceType,
    interval,
    setInterval,
    daysOfWeek,
    toggleDayOfWeek,
    monthlyConfig,
    setMonthlyConfig,
  } = useRecurrenceStore();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekOptions = ['First', 'Second', 'Third', 'Fourth', 'Last'];

  const intervalLabel = {
    daily: 'day(s)',
    weekly: 'week(s)',
    monthly: 'month(s)',
    yearly: 'year(s)',
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="flex items-center space-x-3 p-4 bg-white/60 dark:bg-slate-600/30 rounded-xl border border-slate-200/50 dark:border-slate-500/50">
        <label htmlFor="interval" className="font-medium text-slate-700 dark:text-slate-300">Every</label>
        <input
          id="interval"
          type="number"
          min="1"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value, 10))}
          className="w-16 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-2 text-center font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <span className="font-medium text-slate-600 dark:text-slate-400">{intervalLabel[recurrenceType]}</span>
      </div>

      {recurrenceType === 'weekly' && (
        <div className="space-y-4">
          <p className="font-semibold text-slate-700 dark:text-slate-300">Repeat on</p>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <button
                key={day}
                onClick={() => toggleDayOfWeek(index)}
                className={`flex h-10 w-full items-center justify-center rounded-xl font-medium transition-all duration-200 ${
                  daysOfWeek.includes(index)
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/60 dark:bg-slate-600/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-500 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-600 hover:scale-105'
                } backdrop-blur-sm`}
              >
                <span className="text-xs font-bold">{day.charAt(0)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {recurrenceType === 'monthly' && (
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-white/60 dark:bg-slate-600/30 rounded-xl border border-slate-200/50 dark:border-slate-500/50">
            <input
              type="radio"
              id="on_day"
              name="monthly_type"
              checked={monthlyConfig.type === 'day_of_month'}
              // *** THE FIX IS HERE ***
              onChange={() =>
                setMonthlyConfig({ type: 'day_of_month', day: 1, week: 1 })
              }
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="on_day" className="ml-3 font-medium text-slate-700 dark:text-slate-300">
              On day
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={monthlyConfig.day}
              onChange={(e) => setMonthlyConfig({ ...monthlyConfig, day: parseInt(e.target.value, 10) })}
              className="ml-3 w-16 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-2 text-center font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
              disabled={monthlyConfig.type !== 'day_of_month'}
            />
          </div>

          <div className="flex items-center p-4 bg-white/60 dark:bg-slate-600/30 rounded-xl border border-slate-200/50 dark:border-slate-500/50">
            <input
              type="radio"
              id="on_the"
              name="monthly_type"
              checked={monthlyConfig.type === 'day_of_week'}
              // *** THE FIX IS HERE ***
              onChange={() =>
                setMonthlyConfig({ type: 'day_of_week', day: 1, week: 1 })
              }
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="on_the" className="ml-3 font-medium text-slate-700 dark:text-slate-300">
              On the
            </label>
            <select
              value={monthlyConfig.week}
              onChange={(e) => setMonthlyConfig({ ...monthlyConfig, week: parseInt(e.target.value, 10) })}
              className="ml-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-2 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
              disabled={monthlyConfig.type !== 'day_of_week'}
            >
              {weekOptions.map((opt, index) => (
                <option key={opt} value={index + 1}>{opt}</option>
              ))}
            </select>
            <select
              value={monthlyConfig.day}
              onChange={(e) => setMonthlyConfig({ ...monthlyConfig, day: parseInt(e.target.value, 10) })}
              className="ml-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-2 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
              disabled={monthlyConfig.type !== 'day_of_week'}
            >
              {weekDays.map((day, index) => (
                <option key={day} value={index}>{day}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;