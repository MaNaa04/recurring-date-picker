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
    <div className="mt-6 text-sm">
      <div className="flex items-center space-x-2">
        <label htmlFor="interval">Every</label>
        <input
          id="interval"
          type="number"
          min="1"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value, 10))}
          className="w-16 rounded-md bg-gray-700 p-2 text-center"
        />
        <span>{intervalLabel[recurrenceType]}</span>
      </div>

      {recurrenceType === 'weekly' && (
        <div className="mt-4">
          <p className="mb-2 font-semibold">Repeat on</p>
          <div className="flex justify-between space-x-1">
            {weekDays.map((day, index) => (
              <button
                key={day}
                onClick={() => toggleDayOfWeek(index)}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  daysOfWeek.includes(index)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {day.charAt(0)}
              </button>
            ))}
          </div>
        </div>
      )}

      {recurrenceType === 'monthly' && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="on_day"
              name="monthly_type"
              checked={monthlyConfig.type === 'day_of_month'}
              // *** THE FIX IS HERE ***
              onChange={() =>
                setMonthlyConfig({ type: 'day_of_month', day: 1, week: 1 })
              }
              className="h-4 w-4 bg-gray-700 text-blue-500"
            />
            <label htmlFor="on_day" className="ml-2">
              On day
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={monthlyConfig.day}
              onChange={(e) => setMonthlyConfig({ ...monthlyConfig, day: parseInt(e.target.value, 10) })}
              className="ml-2 w-16 rounded-md bg-gray-700 p-2 text-center"
              disabled={monthlyConfig.type !== 'day_of_month'}
            />
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="on_the"
              name="monthly_type"
              checked={monthlyConfig.type === 'day_of_week'}
              // *** THE FIX IS HERE ***
              onChange={() =>
                setMonthlyConfig({ type: 'day_of_week', day: 1, week: 1 })
              }
              className="h-4 w-4 bg-gray-700 text-blue-500"
            />
            <label htmlFor="on_the" className="ml-2">
              On the
            </label>
            <select
              value={monthlyConfig.week}
              onChange={(e) => setMonthlyConfig({ ...monthlyConfig, week: parseInt(e.target.value, 10) })}
              className="ml-2 rounded-md bg-gray-700 p-2"
              disabled={monthlyConfig.type !== 'day_of_week'}
            >
              {weekOptions.map((opt, index) => (
                <option key={opt} value={index + 1}>{opt}</option>
              ))}
            </select>
            <select
              value={monthlyConfig.day}
              onChange={(e) => setMonthlyConfig({ ...monthlyConfig, day: parseInt(e.target.value, 10) })}
              className="ml-2 rounded-md bg-gray-700 p-2"
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