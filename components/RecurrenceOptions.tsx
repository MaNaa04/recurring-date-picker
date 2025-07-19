// components/RecurrenceOptions.tsx
'use client'; // This is required for components that use hooks

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
      gradient: 'from-amber-400 to-orange-500',
      bgGradient: 'from-amber-50/80 to-orange-50/80 dark:from-amber-900/20 dark:to-orange-900/20',
      borderColor: 'border-amber-300 dark:border-amber-600',
      hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-500',
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
      gradient: 'from-emerald-400 to-teal-500',
      bgGradient: 'from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20',
      borderColor: 'border-emerald-300 dark:border-emerald-600',
      hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500',
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
      gradient: 'from-blue-400 to-indigo-500',
      bgGradient: 'from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20',
      borderColor: 'border-blue-300 dark:border-blue-600',
      hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
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
      gradient: 'from-purple-400 to-pink-500',
      bgGradient: 'from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20',
      borderColor: 'border-purple-300 dark:border-purple-600',
      hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Choose Your Pattern
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
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
                group relative overflow-hidden p-6 rounded-2xl transition-all duration-300 border-2 backdrop-blur-sm
                ${isSelected
                  ? `bg-gradient-to-br ${option.bgGradient} ${option.borderColor} shadow-lg shadow-${option.gradient.split('-')[1]}-500/25 scale-105 ring-2 ring-${option.gradient.split('-')[1]}-400/30`
                  : `bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 ${option.hoverBorder} hover:bg-white/80 dark:hover:bg-slate-800/80 hover:scale-102 hover:shadow-lg`
                }
              `}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-current to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Icon Container */}
                <div className={`
                  relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${isSelected
                    ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg shadow-${option.gradient.split('-')[1]}-500/30`
                    : `bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-gradient-to-br group-hover:${option.gradient} group-hover:text-white`
                  }
                `}>
                  {option.icon}
                  
                  {/* Pulse effect for selected */}
                  {isSelected && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.gradient} animate-ping opacity-20`}></div>
                  )}
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h4 className={`
                    text-lg font-bold transition-colors duration-300
                    ${isSelected
                      ? `text-${option.gradient.split('-')[1]}-700 dark:text-${option.gradient.split('-')[1]}-300`
                      : 'text-slate-900 dark:text-white group-hover:text-slate-900 dark:group-hover:text-white'
                    }
                  `}>
                    {option.label}
                  </h4>
                  <p className={`
                    text-sm transition-colors duration-300
                    ${isSelected
                      ? `text-${option.gradient.split('-')[1]}-600 dark:text-${option.gradient.split('-')[1]}-400`
                      : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                    }
                  `}>
                    {option.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className={`w-4 h-4 text-${option.gradient.split('-')[1]}-500`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                  bg-gradient-to-br ${option.gradient} blur-xl -z-10
                `} style={{ filter: 'blur(20px)' }}></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Option Summary */}
      {recurrenceType && (
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-50/80 to-blue-50/80 dark:from-slate-800/80 dark:to-blue-900/20 rounded-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Selected Pattern:</span>
              {' '}
              <span className="capitalize font-medium text-blue-600 dark:text-blue-400">
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