// components/RecurrenceOptions.tsx
'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';

const RecurrenceOptions = () => {
  const { recurrenceType, setRecurrenceType } = useRecurrenceStore();

  const options = ['daily', 'weekly', 'monthly', 'yearly'];

  return (
    // Simplified from a grid of cards to a clean, vertical stack of buttons.
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setRecurrenceType(option as any)}
          className={`w-full p-3 text-left rounded-lg transition-colors duration-200 font-medium text-sm ${
            recurrenceType === option
              ? 'bg-[#00A99D] text-white shadow-md' // Active state: Primary Teal
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default RecurrenceOptions;