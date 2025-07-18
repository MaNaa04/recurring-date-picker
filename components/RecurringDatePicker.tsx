// components/RecurringDatePicker.tsx
import RecurrenceOptions from './RecurrenceOptions';
import CustomizationPanel from './CustomizationPanel';
import CalendarPreview from './CalendarPreview';
import DateRangePicker from './DateRangePicker';

const RecurringDatePicker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-6 leading-tight">
            Recurring Date Picker
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Create beautiful recurring events with intelligent scheduling. 
            <span className="block mt-2 text-lg text-slate-500 dark:text-slate-400">
              Visualize patterns • Set flexible intervals • Perfect for any schedule
            </span>
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Smart Patterns', 'Visual Preview', 'Flexible Intervals', 'Date Ranges'].map((feature, index) => (
              <div key={feature} className={`
                px-4 py-2 rounded-full text-sm font-medium
                bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                border border-slate-200/50 dark:border-slate-700/50
                text-slate-700 dark:text-slate-300
                shadow-lg hover:shadow-xl transition-all duration-300
                hover:scale-105 hover:bg-white dark:hover:bg-slate-800
                animate-fade-in-up
              `} style={{ animationDelay: `${index * 100}ms` }}>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
            <div className="flex flex-col xl:flex-row">
              
              {/* Configuration Panel */}
              <div className="xl:w-2/5 border-r border-slate-200/50 dark:border-slate-700/50">
                <div className="p-8 lg:p-10 space-y-10">
                  
                  {/* Recurrence Type */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full shadow-lg"></div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pattern Type</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Choose your recurrence frequency</p>
                      </div>
                    </div>
                    <div className="pl-5">
                      <RecurrenceOptions />
                    </div>
                  </div>

                  {/* Customization */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full shadow-lg"></div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customize</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Fine-tune your schedule</p>
                      </div>
                    </div>
                    <div className="pl-5">
                      <div className="bg-slate-50/80 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm">
                        <CustomizationPanel />
                      </div>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Date Range</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Set start and end dates</p>
                      </div>
                    </div>
                    <div className="pl-5">
                      <div className="bg-slate-50/80 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm">
                        <DateRangePicker />
                      </div>
                    </div>
                  </div>

                  {/* Pro Tips */}
                  <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Pro Tips</h3>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Use the visual calendar to verify your pattern</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Weekly patterns support multiple day selection</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Set end dates to limit recurring events</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="xl:w-3/5">
                <div className="p-8 lg:p-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-lg"></div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Live Preview</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">See your recurring pattern in action</p>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Live</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50/50 dark:bg-slate-700/30 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm">
                    <CalendarPreview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white dark:border-slate-800"></div>
              <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white dark:border-slate-800"></div>
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white dark:border-slate-slate-800"></div>
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Real-time updates as you configure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;