// components/RecurrenceOptions.tsx
'use client'; // This is required for components that use hooks

import { useRecurrenceStore } from '@/store/useRecurrenceStore';

const RecurrenceOptions = () => {
  const { recurrenceType, setRecurrenceType } = useRecurrenceStore();

  const options = ['daily', 'weekly', 'monthly', 'yearly'];

  const optionIcons = {
    daily: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    weekly: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    monthly: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    yearly: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  };
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setRecurrenceType(option as any)}
          className={`group relative overflow-hidden p-4 rounded-xl transition-all duration-300 border-2 ${
            recurrenceType === option
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 text-white shadow-lg scale-105' 
              : 'bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-700 hover:scale-102 hover:shadow-md'
          } backdrop-blur-sm`}
        >
          <div className="flex items-center space-x-3">
            <div className={`transition-colors duration-300 ${
              recurrenceType === option 
                ? 'text-white' 
                : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-500'
            }`}>
              {optionIcons[option as keyof typeof optionIcons]}
            </div>
            <span className="font-medium">
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </span>
          </div>
          
          {/* Active indicator */}
          {recurrenceType === option && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default RecurrenceOptions;