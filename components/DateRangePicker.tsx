// components/DateRangePicker.tsx
'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';
import { format, parseISO } from 'date-fns';

const DateRangePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useRecurrenceStore();

  // Helper to format date for input[type="date"] which requires 'yyyy-MM-dd'
  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <div className="space-y-8">
      {/* Start Date Section */}
      <div className="group">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-2 h-2 bg-[#00A99D] rounded-full"></div>
          <h3 className="text-lg font-semibold text-[#1E1E1E] dark:text-[#E5E7EB]">Start Date</h3>
        </div>
        
        <div className="relative">
          <div className="p-6 bg-[#00A99D]/5 rounded-2xl border border-[#00A99D]/20 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#00A99D] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <div className="flex-1">
                <label htmlFor="start-date" className="block text-sm font-semibold text-[#1E1E1E] dark:text-[#E5E7EB] mb-2">
                  When should your recurring pattern begin?
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="start-date"
                    value={formatDateForInput(startDate)}
                    onChange={(e) => setStartDate(parseISO(e.target.value))}
                    className="w-full h-12 px-4 rounded-xl bg-white dark:bg-[#1E1E1E] border-2 border-[#E5E7EB] dark:border-[#374151] text-[#1E1E1E] dark:text-[#E5E7EB] font-medium focus:border-[#00A99D] focus:ring-4 focus:ring-[#00A99D]/20 transition-all duration-200"
                  />
                </div>
              </div>
              
              {/* Visual indicator */}
              <div className="flex items-center space-x-2 text-sm text-[#00A99D]">
                <div className="w-3 h-3 bg-[#00A99D] rounded-full animate-pulse"></div>
                <span className="font-medium">Required</span>
              </div>
            </div>
            
            {/* Date preview */}
            <div className="mt-4 p-3 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E7EB] dark:border-[#374151]">
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                <span className="font-medium text-[#00A99D]">Selected:</span>
                {' '}
                {format(startDate, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* End Date Section */}
      <div className="group">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-2 h-2 bg-[#00A99D] rounded-full"></div>
          <h3 className="text-lg font-semibold text-[#1E1E1E] dark:text-[#E5E7EB]">End Date</h3>
          <span className="px-3 py-1 text-xs font-medium bg-[#F8F9FA] dark:bg-[#121212] text-[#6B7280] dark:text-[#9CA3AF] rounded-full border border-[#E5E7EB] dark:border-[#374151]">
            Optional
          </span>
        </div>
        
        <div className="relative">
          <div className="p-6 bg-[#00A99D]/5 rounded-2xl border border-[#00A99D]/20 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#00A99D] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div className="flex-1">
                <label htmlFor="end-date" className="block text-sm font-semibold text-[#1E1E1E] dark:text-[#E5E7EB] mb-2">
                  When should the pattern stop? (Leave empty for no end date)
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="end-date"
                    value={formatDateForInput(endDate)}
                    onChange={(e) => setEndDate(e.target.value ? parseISO(e.target.value) : null)}
                    className="w-full h-12 px-4 rounded-xl bg-white dark:bg-[#1E1E1E] border-2 border-[#E5E7EB] dark:border-[#374151] text-[#1E1E1E] dark:text-[#E5E7EB] font-medium focus:border-[#00A99D] focus:ring-4 focus:ring-[#00A99D]/20 transition-all duration-200"
                  />
                </div>
              </div>
              
              {/* Clear button */}
              {endDate && (
                <button
                  onClick={() => setEndDate(null)}
                  className="flex-shrink-0 w-10 h-10 bg-white dark:bg-[#1E1E1E] border-2 border-[#E5E7EB] dark:border-[#374151] rounded-xl flex items-center justify-center text-[#00A99D] hover:bg-[#00A99D]/5 hover:border-[#00A99D]/30 transition-all duration-200 group/clear"
                >
                  <svg className="w-5 h-5 group-hover/clear:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Date preview or empty state */}
            <div className="mt-4 p-3 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E7EB] dark:border-[#374151]">
              {endDate ? (
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  <span className="font-medium text-[#00A99D]">Selected:</span>
                  {' '}
                  {format(endDate, 'EEEE, MMMM d, yyyy')}
                </p>
              ) : (
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] italic">
                  No end date - pattern will continue indefinitely
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Summary */}
      <div className="p-6 bg-[#00A99D]/5 rounded-2xl border border-[#00A99D]/20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-2 h-2 bg-[#00A99D] rounded-full"></div>
          <h4 className="text-lg font-semibold text-[#1E1E1E] dark:text-[#E5E7EB]">Date Range Summary</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E7EB] dark:border-[#374151]">
            <div className="w-10 h-10 bg-[#00A99D] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#1E1E1E] dark:text-[#E5E7EB]">Start Date</p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">{format(startDate, 'MMM d, yyyy')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E5E7EB] dark:border-[#374151]">
            <div className="w-10 h-10 bg-[#00A99D] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#1E1E1E] dark:text-[#E5E7EB]">End Date</p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                {endDate ? format(endDate, 'MMM d, yyyy') : 'No end date'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Duration calculation */}
        {endDate && (
          <div className="mt-4 p-3 bg-[#00A99D]/10 rounded-xl border border-[#00A99D]/20">
            <p className="text-sm text-[#00A99D]">
              <span className="font-medium">Duration:</span>
              {' '}
              {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;