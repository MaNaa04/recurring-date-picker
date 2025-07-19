// components/RecurrenceOptions.tsx
'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';

const RecurrenceOptions = () => {
  const { recurrenceType, setRecurrenceType } = useRecurrenceStore();

  const options = [
    {
      id: 'daily',
      label: 'Daily',
      description: 'Repeat every day',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 'weekly',
      label: 'Weekly',
      description: 'Repeat every week',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'monthly',
      label: 'Monthly',
      description: 'Repeat every month',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: 'yearly',
      label: 'Yearly',
      description: 'Repeat every year',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-[#1E1E1E] dark:text-[#E5E7EB] mb-2">
          Choose Your Pattern
        </h3>
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Select how often your event should repeat
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = recurrenceType === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => setRecurrenceType(option.id as any)}
              className={`
                group relative overflow-hidden p-6 rounded-2xl transition-all duration-300 border-2
                ${isSelected
                  ? 'bg-[#00A99D]/5 border-[#00A99D] shadow-lg shadow-[#00A99D]/10 scale-105'
                  : 'bg-white dark:bg-[#1E1E1E] border-[#E5E7EB] dark:border-[#374151] hover:border-[#00A99D]/30 hover:bg-[#00A99D]/5 hover:scale-102 hover:shadow-md'
                }
              `}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A99D] rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00A99D] rounded-full transform -translate-x-12 translate-y-12"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Icon Container */}
                <div className={`
                  relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${isSelected
                    ? 'bg-[#00A99D] text-white shadow-lg shadow-[#00A99D]/30'
                    : 'bg-[#F8F9FA] dark:bg-[#121212] text-[#6B7280] dark:text-[#9CA3AF] group-hover:bg-[#00A99D] group-hover:text-white'
                  }
                `}>
                  {option.icon}
                  
                  {/* Pulse effect for selected */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-2xl bg-[#00A99D] animate-ping opacity-20"></div>
                  )}
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h4 className={`
                    text-lg font-bold transition-colors duration-300
                    ${isSelected
                      ? 'text-[#00A99D]'
                      : 'text-[#1E1E1E] dark:text-[#E5E7EB] group-hover:text-[#00A99D]'
                    }
                  `}>
                    {option.label}
                  </h4>
                  <p className={`
                    text-sm transition-colors duration-300
                    ${isSelected
                      ? 'text-[#00A99D]/80'
                      : 'text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-[#6B7280] dark:group-hover:text-[#9CA3AF]'
                    }
                  `}>
                    {option.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-[#00A99D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[#00A99D]/5 -z-10"></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Option Summary */}
      {recurrenceType && (
        <div className="mt-6 p-4 bg-[#00A99D]/5 rounded-xl border border-[#00A99D]/20">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#00A99D] rounded-full animate-pulse"></div>
            <p className="text-sm text-[#1E1E1E] dark:text-[#E5E7EB]">
              <span className="font-semibold">Selected Pattern:</span>
              {' '}
              <span className="capitalize font-medium text-[#00A99D]">
                {recurrenceType}
              </span>
              {' '}
              recurrence
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurrenceOptions;