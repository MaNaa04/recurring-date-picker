// components/RecurringDatePicker.tsx
import RecurrenceOptions from './RecurrenceOptions';
import CustomizationPanel from './CustomizationPanel';
import CalendarPreview from './CalendarPreview';
import DateRangePicker from './DateRangePicker';

const RecurringDatePicker = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] transition-colors duration-300">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#00A99D]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#00A99D]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00A99D] rounded-2xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-[#00A99D] p-4 rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-[#1E1E1E] dark:text-[#E5E7EB] mb-6 leading-tight">
            Recurring Date Picker
          </h1>
          
          <p className="text-xl text-[#6B7280] dark:text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed mb-8">
            Create beautiful recurring events with intelligent scheduling.
            <span className="block mt-2 text-lg">
              Visualize patterns • Set flexible intervals • Perfect for any schedule
            </span>
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Smart Patterns', 'Visual Preview', 'Flexible Intervals', 'Date Ranges'].map((feature, index) => (
              <div key={feature} className={`
                px-4 py-2 rounded-full text-sm font-medium
                bg-white dark:bg-[#1E1E1E] border border-[#E5E7EB] dark:border-[#374151]
                text-[#1E1E1E] dark:text-[#E5E7EB]
                shadow-sm hover:shadow-md transition-all duration-300
                hover:scale-105 hover:border-[#00A99D]/30
                animate-fade-in-up
              `} style={{ animationDelay: `${index * 100}ms` }}>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-xl border border-[#E5E7EB] dark:border-[#374151] overflow-hidden">
            <div className="flex flex-col xl:flex-row">
              
              {/* Configuration Panel */}
              <div className="xl:w-1/3 border-r border-[#E5E7EB] dark:border-[#374151]">
                <div className="p-8 lg:p-10 space-y-10">
                  
                  {/* Recurrence Type */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-1 h-8 bg-[#00A99D] rounded-full"></div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-[#E5E7EB]">Pattern Type</h2>
                        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">Choose your recurrence frequency</p>
                      </div>
                    </div>
                    <div className="pl-5">
                      <RecurrenceOptions />
                    </div>
                  </div>

                  {/* Customization */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-1 h-8 bg-[#00A99D] rounded-full"></div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-[#E5E7EB]">Customize</h2>
                        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">Fine-tune your schedule</p>
                      </div>
                    </div>
                    <div className="pl-5">
                      <div className="bg-[#F8F9FA] dark:bg-[#121212] rounded-2xl p-6 border border-[#E5E7EB] dark:border-[#374151]">
                        <CustomizationPanel />
                      </div>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-1 h-8 bg-[#00A99D] rounded-full"></div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-[#E5E7EB]">Date Range</h2>
                        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">Set start and end dates</p>
                      </div>
                    </div>
                    <div className="pl-5">
                      <div className="bg-[#F8F9FA] dark:bg-[#121212] rounded-2xl p-6 border border-[#E5E7EB] dark:border-[#374151]">
                        <DateRangePicker />
                      </div>
                    </div>
                  </div>

                  {/* Pro Tips */}
                  <div className="bg-[#00A99D]/5 dark:bg-[#00A99D]/10 rounded-2xl p-6 border border-[#00A99D]/20">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#00A99D] rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#1E1E1E] dark:text-[#E5E7EB] mb-3">Pro Tips</h3>
                        <ul className="space-y-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#00A99D] rounded-full mt-2 flex-shrink-0"></div>
                            <span>Use the visual calendar to verify your pattern</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#00A99D] rounded-full mt-2 flex-shrink-0"></div>
                            <span>Weekly patterns support multiple day selection</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#00A99D] rounded-full mt-2 flex-shrink-0"></div>
                            <span>Set end dates to limit recurring events</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="xl:w-2/3">
                <div className="p-8 lg:p-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-1 h-8 bg-[#00A99D] rounded-full"></div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-[#E5E7EB]">Live Preview</h2>
                      <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">See your recurring pattern in action</p>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-[#00A99D]/10 rounded-full border border-[#00A99D]/20">
                      <div className="w-2 h-2 bg-[#00A99D] rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-[#00A99D]">Live</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#F8F9FA] dark:bg-[#121212] rounded-2xl p-6 border border-[#E5E7EB] dark:border-[#374151]">
                    <CalendarPreview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white dark:bg-[#1E1E1E] rounded-full border border-[#E5E7EB] dark:border-[#374151] shadow-sm">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-[#00A99D] rounded-full border-2 border-white dark:border-[#1E1E1E]"></div>
              <div className="w-6 h-6 bg-[#00A99D]/80 rounded-full border-2 border-white dark:border-[#1E1E1E]"></div>
              <div className="w-6 h-6 bg-[#00A99D]/60 rounded-full border-2 border-white dark:border-[#1E1E1E]"></div>
            </div>
            <span className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
              Real-time updates as you configure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;