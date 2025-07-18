// components/RecurringDatePicker.tsx
import RecurrenceOptions from './RecurrenceOptions';
import CustomizationPanel from './CustomizationPanel';
import CalendarPreview from './CalendarPreview';
import DateRangePicker from './DateRangePicker';

const RecurringDatePicker = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Recurring Date Picker</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Create and visualize recurring events with flexible scheduling options. 
          Set up daily, weekly, monthly, or yearly patterns with custom intervals.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl overflow-hidden">
        
        {/* Left Panel - Configuration */}
        <div className="lg:w-2/5 xl:w-1/3">
          <div className="p-8 space-y-8 border-r border-gray-700/50 bg-gray-800/30 h-full">
            
            {/* Recurrence Type Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-white">Recurrence Pattern</h2>
              </div>
              <RecurrenceOptions />
            </div>

            {/* Customization Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-white">Customization</h2>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <CustomizationPanel />
              </div>
            </div>

            {/* Date Range Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-white">Date Range</h2>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <DateRangePicker />
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-blue-300 mb-2">Quick Tips</h3>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Use the calendar to visualize your recurring pattern</li>
                    <li>• Set an end date to limit the recurrence</li>
                    <li>• Weekly patterns allow multiple days selection</li>
                    <li>• Monthly patterns support both date and weekday options</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:w-3/5 xl:w-2/3">
          <div className="p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full"></div>
              <h2 className="text-xl font-bold text-white">Calendar Preview</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
            </div>
            
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-600/30">
              <CalendarPreview />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Real-time preview updates as you configure your recurring pattern</span>
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;