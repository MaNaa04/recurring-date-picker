
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

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Single letter for circles
  const weekDayOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekOptions = ['First', 'Second', 'Third', 'Fourth', 'Last'];

  const intervalLabels = {
    daily: 'day(s)',
    weekly: 'week(s)',
    monthly: 'month(s)',
    yearly: 'year(s)',
  };

  return (
    <div className="space-y-4 text-sm">
      {/* Interval Input */}
      <div className="flex items-center space-x-3">
        <label htmlFor="interval" className="font-semibold text-gray-600 dark:text-gray-300">Every</label>
        <input
          id="interval"
          type="number"
          min="1"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value, 10) || 1)}
          className="w-16 rounded-lg bg-gray-100 dark:bg-gray-700 p-2 text-center font-medium text-gray-800 dark:text-white border-transparent focus:ring-2 focus:ring-[#00A99D]"
        />
        <span className="text-gray-600 dark:text-gray-400">{intervalLabels[recurrenceType]}</span>
      </div>

      {/* Weekly Day Selector */}
      {recurrenceType === 'weekly' && (
        <div className="space-y-2">
          <p className="font-semibold text-gray-600 dark:text-gray-300">Repeat on</p>
          <div className="flex justify-between">
            {weekDays.map((day, index) => (
              <button
                key={index}
                onClick={() => toggleDayOfWeek(index)}
                className={`flex h-9 w-9 items-center justify-center rounded-full font-bold transition-all duration-200 ${
                  daysOfWeek.includes(index)
                    ? 'bg-[#00A99D] text-white' // Active: Primary Teal
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Pattern Selector */}
      {recurrenceType === 'monthly' && (
        <div className="space-y-3">
          {/* Radio Button for "On day" */}
          <div className="flex items-center">
            <input type="radio" id="on_day" name="monthly_type" checked={monthlyConfig.type === 'day_of_month'}
              onChange={() => setMonthlyConfig({ type: 'day_of_month', day: 1, week: 1 })}
              className="h-4 w-4 text-[#00A99D] focus:ring-[#00A99D] bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
            <label htmlFor="on_day" className="ml-2 font-medium text-gray-700 dark:text-gray-200">On day</label>
            <input
              type="number" min="1" max="31" value={monthlyConfig.day}
              onChange={(e) => setMonthlyConfig({ ...monthlyConfig, day: parseInt(e.target.value, 10) || 1 })}
              className="ml-2 w-16 rounded-lg bg-gray-100 dark:bg-gray-700 p-2 text-center font-medium text-gray-800 dark:text-white disabled:opacity-50 border-transparent focus:ring-2 focus:ring-[#00A99D]"
              disabled={monthlyConfig.type !== 'day_of_month'}
            />
          </div>

          {/* Radio Button for "On the" */}
          <div className="flex items-center">
            <input type="radio" id="on_the" name="monthly_type" checked={monthlyConfig.type === 'day_of_week'}
              onChange={() => setMonthlyConfig({ type: 'day_of_week', day: 1, week: 1 })}
              className="h-4 w-4 text-[#00A99D] focus:ring-[#00A99D] bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
            <label htmlFor="on_the" className="ml-2 font-medium text-gray-700 dark:text-gray-200">On the</label>
            <select
              value={monthlyConfig.week}
              onChange={(e) => setMonthlyConfig({ ...monthlyConfig, week: parseInt(e.target.value, 10) })}
              className="ml-2 rounded-lg bg-gray-100 dark:bg-gray-700 p-2 font-medium text-gray-800 dark:text-white disabled:opacity-50 border-transparent focus:ring-2 focus:ring-[#00A99D]"
              disabled={monthlyConfig.type !== 'day_of_week'}
            >
              {weekOptions.map((opt, index) => (<option key={opt} value={index + 1}>{opt}</option>))}
            </select>
            <select
              value={monthlyConfig.day}
              onChange={(e) => setMonthlyConfig({ ...monthlyConfig, day: parseInt(e.target.value, 10) })}
              className="ml-2 rounded-lg bg-gray-100 dark:bg-gray-700 p-2 font-medium text-gray-800 dark:text-white disabled:opacity-50 border-transparent focus:ring-2 focus:ring-[#00A99D]"
              disabled={monthlyConfig.type !== 'day_of_week'}
            >
              {weekDayOptions.map((day, index) => (<option key={day} value={index}>{day}</option>))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;