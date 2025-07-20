
import RecurrenceOptions from './RecurrenceOptions';
import CustomizationPanel from './CustomizationPanel';
import CalendarPreview from './CalendarPreview';
import DateRangePicker from './DateRangePicker';

const RecurringDatePicker = () => {
  return (
    
    <div className="flex w-full max-w-5xl rounded-xl bg-white dark:bg-[#1E1E1E] shadow-lg font-sans my-12">
      
      {/* Left Panel: Configuration */}
      <div className="w-2/5 border-r border-gray-200 dark:border-gray-700 p-6 space-y-6">
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
      <div className="w-3/5 p-6 bg-gray-50 dark:bg-black/20 rounded-r-xl">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Preview</h2>
        <CalendarPreview />
      </div>
    </div>
  );
};

export default RecurringDatePicker;