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
          <div className="w-2 h-2 bg-[#00A99D] rounded-full"></div>
          <h3 className="text-lg font-semibold text-[#1E1E1E] dark:text-[#E5E7EB]">Frequency</h3>
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-4 p-6 bg-[#00A99D]/5 rounded-2xl border border-[#00A99D]/20 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
            <div className="flex items-center space-x-3">
              <span className="text-[#1E1E1E] dark:text-[#E5E7EB] font-medium">Every</span>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={interval}
                  onChange={(e) => setInterval(parseInt(e.target.value, 10) || 1)}
                  className="w-20 h-12 text-center text-lg font-bold bg-white dark:bg-[#1E1E1E] border-2 border-[#E5E7EB] dark:border-[#374151] rounded-xl focus:border-[#00A99D] focus:ring-4 focus:ring-[#00A99D]/20 transition-all duration-200 text-[#1E1E1E] dark:text-[#E5E7EB]"
                />
              </div>
              <span className="text-[#1E1E1E] dark:text-[#E5E7EB] font-medium">
                {getIntervalLabel()}
              </span>
            </div>
            
            {/* Visual indicator */}
            <div className="ml-auto flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#00A99D] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-medium">
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
            <div className="w-2 h-2 bg-[#00A99D] rounded-full"></div>
            <h3 className="text-lg font-semibold text-[#1E1E1E] dark:text-[#E5E7EB]">Days of the Week</h3>
          </div>
          
          <div className="p-6 bg-[#00A99D]/5 rounded-2xl border border-[#00A99D]/20 transition-all duration-300 group-hover:shadow-lg">
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-4 font-medium">
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
                        ? 'bg-[#00A99D] text-white shadow-lg shadow-[#00A99D]/25 ring-2 ring-[#00A99D]/50'
                        : 'bg-white dark:bg-[#1E1E1E] text-[#6B7280] dark:text-[#9CA3AF] border-2 border-[#E5E7EB] dark:border-[#374151] hover:border-[#00A99D]/30 hover:bg-[#00A99D]/5'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center justify-center h-full space-y-1">
                      <span className="text-lg font-bold">{day.short}</span>
                      <span className="text-xs opacity-80">{day.full}</span>
                    </div>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-2.5 h-2.5 text-[#00A99D]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Selection summary */}
            <div className="mt-4 p-3 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E7EB] dark:border-[#374151]">
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                <span className="font-medium text-[#00A99D]">
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
            <div className="w-2 h-2 bg-[#00A99D] rounded-full"></div>
            <h3 className="text-lg font-semibold text-[#1E1E1E] dark:text-[#E5E7EB]">Monthly Pattern</h3>
          </div>
          
          <div className="space-y-4">
            {/* Day of Month Option */}
            <div className={`
              p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
              ${monthlyConfig.type === 'day_of_month'
                ? 'bg-[#00A99D]/5 border-[#00A99D] shadow-lg shadow-[#00A99D]/10'
                : 'bg-white dark:bg-[#1E1E1E] border-[#E5E7EB] dark:border-[#374151] hover:border-[#00A99D]/30 hover:bg-[#00A99D]/5'
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
                    className="w-5 h-5 text-[#00A99D] focus:ring-[#00A99D] focus:ring-2 border-2 border-[#E5E7EB] dark:border-[#374151]"
                  />
                  {monthlyConfig.type === 'day_of_month' && (
                    <div className="absolute inset-0 rounded-full bg-[#00A99D]/20 animate-ping"></div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 flex-1">
                  <label htmlFor="on_day" className="font-semibold text-[#1E1E1E] dark:text-[#E5E7EB] cursor-pointer">
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
                        w-20 h-12 text-center text-lg font-bold rounded-xl border-2 transition-all duration-200
                        ${monthlyConfig.type === 'day_of_month'
                          ? 'bg-white dark:bg-[#1E1E1E] border-[#00A99D] text-[#1E1E1E] dark:text-[#E5E7EB] focus:border-[#00A99D] focus:ring-4 focus:ring-[#00A99D]/20'
                          : 'bg-[#F8F9FA] dark:bg-[#121212] border-[#E5E7EB] dark:border-[#374151] text-[#6B7280] dark:text-[#9CA3AF] cursor-not-allowed'
                        }
                      `}
                    />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                      of month
                    </span>
                  </div>
                </div>
                
                {monthlyConfig.type === 'day_of_month' && (
                  <div className="flex items-center space-x-2 text-sm text-[#00A99D]">
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
              p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
              ${monthlyConfig.type === 'day_of_week'
                ? 'bg-[#00A99D]/5 border-[#00A99D] shadow-lg shadow-[#00A99D]/10'
                : 'bg-white dark:bg-[#1E1E1E] border-[#E5E7EB] dark:border-[#374151] hover:border-[#00A99D]/30 hover:bg-[#00A99D]/5'
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
                    className="w-5 h-5 text-[#00A99D] focus:ring-[#00A99D] focus:ring-2 border-2 border-[#E5E7EB] dark:border-[#374151]"
                  />
                  {monthlyConfig.type === 'day_of_week' && (
                    <div className="absolute inset-0 rounded-full bg-[#00A99D]/20 animate-ping"></div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 flex-1 flex-wrap gap-y-2">
                  <label htmlFor="on_the" className="font-semibold text-[#1E1E1E] dark:text-[#E5E7EB] cursor-pointer">
                    On the
                  </label>
                  
                  <select
                    value={monthlyConfig.week}
                    onChange={(e) => setMonthlyConfig({ ...monthlyConfig, week: parseInt(e.target.value, 10) })}
                    disabled={monthlyConfig.type !== 'day_of_week'}
                    className={`
                      h-12 px-4 rounded-xl border-2 font-semibold transition-all duration-200
                      ${monthlyConfig.type === 'day_of_week'
                        ? 'bg-white dark:bg-[#1E1E1E] border-[#00A99D] text-[#1E1E1E] dark:text-[#E5E7EB] focus:border-[#00A99D] focus:ring-4 focus:ring-[#00A99D]/20'
                        : 'bg-[#F8F9FA] dark:bg-[#121212] border-[#E5E7EB] dark:border-[#374151] text-[#6B7280] dark:text-[#9CA3AF] cursor-not-allowed'
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
                      h-12 px-4 rounded-xl border-2 font-semibold transition-all duration-200
                      ${monthlyConfig.type === 'day_of_week'
                        ? 'bg-white dark:bg-[#1E1E1E] border-[#00A99D] text-[#1E1E1E] dark:text-[#E5E7EB] focus:border-[#00A99D] focus:ring-4 focus:ring-[#00A99D]/20'
                        : 'bg-[#F8F9FA] dark:bg-[#121212] border-[#E5E7EB] dark:border-[#374151] text-[#6B7280] dark:text-[#9CA3AF] cursor-not-allowed'
                      }
                    `}
                  >
                    {weekDays.map((day) => (
                      <option key={day.index} value={day.index}>{day.full}</option>
                    ))}
                  </select>
                </div>
                
                {monthlyConfig.type === 'day_of_week' && (
                  <div className="flex items-center space-x-2 text-sm text-[#00A99D]">
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
      <div className="p-6 bg-[#00A99D]/5 rounded-2xl border border-[#00A99D]/20">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-2 h-2 bg-[#00A99D] rounded-full"></div>
          <h4 className="text-sm font-semibold text-[#1E1E1E] dark:text-[#E5E7EB]">Configuration Summary</h4>
        </div>
        
        <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF] space-y-1">
          <p>
            <span className="font-medium text-[#1E1E1E] dark:text-[#E5E7EB]">Pattern:</span>
            {' '}
            {recurrenceType.charAt(0).toUpperCase() + recurrenceType.slice(1)}
            {interval > 1 && ` (every ${interval} ${getIntervalLabel()})`}
          </p>
          
          {recurrenceType === 'weekly' && daysOfWeek.length > 0 && (
            <p>
              <span className="font-medium text-[#1E1E1E] dark:text-[#E5E7EB]">Days:</span>
              {' '}
              {weekDays.filter(day => daysOfWeek.includes(day.index)).map(day => day.full).join(', ')}
            </p>
          )}
          
          {recurrenceType === 'monthly' && (
            <p>
              <span className="font-medium text-[#1E1E1E] dark:text-[#E5E7EB]">Monthly:</span>
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