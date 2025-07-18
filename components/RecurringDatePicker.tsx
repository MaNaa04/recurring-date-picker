// components/RecurringDatePicker.tsx
import RecurrenceOptions from './RecurrenceOptions';
import CustomizationPanel from './CustomizationPanel';
import CalendarPreview from './CalendarPreview';
import DateRangePicker from './DateRangePicker'; // Import the new component

const RecurringDatePicker = () => {
  return (
    <div className="flex w-full max-w-4xl rounded-lg bg-gray-800 text-white shadow-lg">
      <div className="w-1/3 border-r border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4">Recurrence</h2>
        <RecurrenceOptions />
        <CustomizationPanel />
        <DateRangePicker /> {/* Add the new component here */}
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-lg font-bold mb-4">Preview</h2>
        <CalendarPreview />
      </div>
    </div>
  );
};

export default RecurringDatePicker;