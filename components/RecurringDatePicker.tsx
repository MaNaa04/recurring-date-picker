// components/RecurringDatePicker.tsx
import RecurrenceOptions from './RecurrenceOptions';
import CustomizationPanel from './CustomizationPanel';
import CalendarPreview from './CalendarPreview';
import DateRangePicker from './DateRangePicker';

const RecurringDatePicker = () => {
  return (
    // RESPONSIVE CHANGE: Use flex-col by default, and md:flex-row for medium screens and up.
    <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-xl bg-white dark:bg-[#1E1E1E] shadow-lg font-sans my-12 overflow-hidden">
      
      {/* Left Panel: Configuration */}
      {/* RESPONSIVE CHANGE: Use w-full for small screens, md:w-2/5 for medium and up. */}
      {/* Also, change border to be at the bottom on mobile (border-b) and on the right on desktop (md:border-r). */}
      <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Recurrence Type</h2>
          <RecurrenceOptions />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Customize Pattern</h2>
          <CustomizationPanel />
        </div>
        
        <div className="space-y-2">
           <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Date Range</h2>
          <DateRangePicker />
        </div>
      </div>

      {/* Right Panel: Preview */}
      {/* RESPONSIVE CHANGE: Use w-full for small screens, md:w-3/5 for medium and up. */}
      <div className="w-full md:w-3/5 p-6 bg-gray-50 dark:bg-black/20 md:rounded-r-xl">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Preview</h2>
        <CalendarPreview />
      </div>
    </div>
  );
};

export default RecurringDatePicker;