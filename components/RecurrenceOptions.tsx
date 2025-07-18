// components/RecurrenceOptions.tsx
'use client'; // This is required for components that use hooks

import { useRecurrenceStore } from '@/store/useRecurrenceStore';

const RecurrenceOptions = () => {
  const { recurrenceType, setRecurrenceType } = useRecurrenceStore();

  const options = ['daily', 'weekly', 'monthly', 'yearly'];

  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setRecurrenceType(option as any)}
          className={`w-full p-2 text-left rounded-md transition-colors ${
            recurrenceType === option
              ? 'bg-gray-600' // Active style
              : 'bg-gray-700 hover:bg-gray-600' // Inactive style
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default RecurrenceOptions;