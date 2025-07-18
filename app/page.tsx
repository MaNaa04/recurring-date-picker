// app/page.tsx
import RecurringDatePicker from '@/components/RecurringDatePicker';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-24">
      <h1 className="text-4xl font-bold mb-8 text-white">Recurring Date Picker</h1>
      <RecurringDatePicker />
    </main>
  );
}