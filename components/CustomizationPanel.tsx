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

  const weekDays = [
    { short: 'S', full: 'Sun', index: 0 },
    { short: 'M', full: 'Mon', index: 1 },
    { short: 'T', full: 'Tue', index: 2 },
    { short: 'W', full: 'Wed', index: 3 },
    { short: 'T', full: 'Thu', index: 4 },
    { short: 'F', full: 'Fri', index: 5 },
    { short: 'S', full: 'Sat', index: 6 },
  ];
  
  const weekOptions = [
    { label: 'First', value: 1 },
    { label: 'Second', value: 2 },
    { label: 'Third', value: 3 },
    { label: 'Fourth', value: 4 },
    { label: 'Last', value: 5 },
  ];

  const intervalLabels = {
    daily: { singular: 'day', plural: 'days' },
    weekly: { singular: 'week', plural: 'weeks' },
    monthly: { singular: 'month', plural: 'months' },
    yearly: { singular: 'year', plural: 'years' },
  };

  const getIntervalLabel = () => {
    const labels = intervalLabels[recurrenceType];
    return interval === 1 ? labels.singular : labels.plural;
  };

  return (
    <div className="space-y-8">
      {/* Interval Configuration */}
      <div className="group">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Frequency</h3>
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Every</span>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={interval}
                  onChange={(e) => setInterval(parseInt(e.target.value, 10) || 1)}
                  className="w-20 h-12 text-center text-lg font-bold bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 dark:text-white backdrop-blur-sm"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {getIntervalLabel()}
              </span>
            </div>
            
            {/* Visual indicator */}
            <div className="ml-auto flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {interval > 1 ? `Every ${interval} ${getIntervalLabel()}` : `Every ${getIntervalLabel()}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Configuration */}
      {recurrenceType === 'weekly' && (
        <div className="group">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Days of the Week</h3>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
              Select the days when your event should repeat
            </p>
            
            <div className="grid grid-cols-7 gap-3">
              {weekDays.map((day) => {
                const isSelected = daysOfWeek.includes(day.index);
                return (
                  <button
                    key={day.index}
                    onClick={() => toggleDayOfWeek(day.index)}
                    className={`
                      group/day relative h-16 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95
                      ${isSelected
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                      } backdrop-blur-sm
                    `}
                  >
                    <div className="flex flex-col items-center justify-center h-full space-y-1">
                      <span className="text-lg font-bold">{day.short}</span>
                      <span className="text-xs opacity-80">{day.full}</span>
                    </div>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-2.5 h-2.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Selection summary */}
            <div className="mt-4 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {daysOfWeek.length}
                </span>
                {' '}
                {daysOfWeek.length === 1 ? 'day' : 'days'} selected
                {daysOfWeek.length > 0 && (
                  <span className="ml-2 text-xs">
                    ({weekDays.filter(day => daysOfWeek.includes(day.index)).map(day => day.full).join(', ')})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Configuration */}
      {recurrenceType === 'monthly' && (
        <div className="group">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Pattern</h3>
          </div>
          
          <div className="space-y-4">
            {/* Day of Month Option */}
            <div className={`
              p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer backdrop-blur-sm
              ${monthlyConfig.type === 'day_of_month'
                ? 'bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-300 dark:border-purple-600 shadow-lg shadow-purple-500/10'
                : 'bg-white/60 dark:bg-gray-800/60 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
              }
            `}>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="radio"
                    id="on_day"
                    name="monthly_type"
                    checked={monthlyConfig.type === 'day_of_month'}
                    onChange={() => setMonthlyConfig({ type: 'day_of_month', day: 1, week: 1 })}
                    className="w-5 h-5 text-purple-500 focus:ring-purple-500 focus:ring-2 border-2 border-gray-300 dark:border-gray-600"
                  />
                  {monthlyConfig.type === 'day_of_month' && (
                    <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 flex-1">
                  <label htmlFor="on_day" className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                    On day
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={monthlyConfig.day}
                      onChange={(e) => setMonthlyConfig({ ...monthlyConfig, day: parseInt(e.target.value, 10) || 1 })}
                      disabled={monthlyConfig.type !== 'day_of_month'}
                      className={`
                        w-20 h-12 text-center text-lg font-bold rounded-xl border-2 transition-all duration-200 backdrop-blur-sm
                        ${monthlyConfig.type === 'day_of_month'
                          ? 'bg-white/80 dark:bg-gray-800/80 border-purple-300 dark:border-purple-600 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20'
                          : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        }
                      `}
                    />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
                      of month
                    </span>
                  </div>
                </div>
                
                {monthlyConfig.type === 'day_of_month' && (
                  <div className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Selected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Day of Week Option */}
            <div className={`
              p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer backdrop-blur-sm
              ${monthlyConfig.type === 'day_of_week'
                ? 'bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-300 dark:border-purple-600 shadow-lg shadow-purple-500/10'
                : 'bg-white/60 dark:bg-gray-800/60 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
              }
            `}>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="radio"
                    id="on_the"
                    name="monthly_type"
                    checked={monthlyConfig.type === 'day_of_week'}
                    onChange={() => setMonthlyConfig({ type: 'day_of_week', day: 1, week: 1 })}
                    className="w-5 h-5 text-purple-500 focus:ring-purple-500 focus:ring-2 border-2 border-gray-300 dark:border-gray-600"
                  />
                  {monthlyConfig.type === 'day_of_week' && (
                    <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 flex-1 flex-wrap gap-y-2">
                  <label htmlFor="on_the" className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                    On the
                  </label>
                  
                  <select
                    value={monthlyConfig.week}
                    onChange={(e) => setMonthlyConfig({ ...monthlyConfig, week: parseInt(e.target.value, 10) })}
                    disabled={monthlyConfig.type !== 'day_of_week'}
                    className={`
                      h-12 px-4 rounded-xl border-2 font-semibold transition-all duration-200 backdrop-blur-sm
                      ${monthlyConfig.type === 'day_of_week'
                        ? 'bg-white/80 dark:bg-gray-800/80 border-purple-300 dark:border-purple-600 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20'
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    {weekOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  
                  <select
                    value={monthlyConfig.day}
                    onChange={(e) => setMonthlyConfig({ ...monthlyConfig, day: parseInt(e.target.value, 10) })}
                    disabled={monthlyConfig.type !== 'day_of_week'}
                    className={`
                      h-12 px-4 rounded-xl border-2 font-semibold transition-all duration-200 backdrop-blur-sm
                      ${monthlyConfig.type === 'day_of_week'
                        ? 'bg-white/80 dark:bg-gray-800/80 border-purple-300 dark:border-purple-600 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20'
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    {weekDays.map((day) => (
                      <option key={day.index} value={day.index}>{day.full}</option>
                    ))}
                  </select>
                </div>
                
                {monthlyConfig.type === 'day_of_week' && (
                  <div className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Summary */}
      <div className="p-6 bg-gradient-to-r from-gray-50/80 to-blue-50/80 dark:from-gray-800/80 dark:to-blue-900/20 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-blue-500 rounded-full"></div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Configuration Summary</h4>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>
            <span className="font-medium text-gray-900 dark:text-white">Pattern:</span>
            {' '}
            {recurrenceType.charAt(0).toUpperCase() + recurrenceType.slice(1)}
            {interval > 1 && ` (every ${interval} ${getIntervalLabel()})`}
          </p>
          
          {recurrenceType === 'weekly' && daysOfWeek.length > 0 && (
            <p>
              <span className="font-medium text-gray-900 dark:text-white">Days:</span>
              {' '}
              {weekDays.filter(day => daysOfWeek.includes(day.index)).map(day => day.full).join(', ')}
            </p>
          )}
          
          {recurrenceType === 'monthly' && (
            <p>
              <span className="font-medium text-gray-900 dark:text-white">Monthly:</span>
              {' '}
              {monthlyConfig.type === 'day_of_month' 
                ? `On day ${monthlyConfig.day} of each month`
                : `On the ${weekOptions.find(w => w.value === monthlyConfig.week)?.label.toLowerCase()} ${weekDays[monthlyConfig.day]?.full} of each month`
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;