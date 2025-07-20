
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecurringDatePicker from './RecurringDatePicker';
import '@testing-library/jest-dom';

describe('RecurringDatePicker', () => {
  it('should display monthly options when the monthly button is clicked', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);

    const monthlyButton = screen.getByRole('button', { name: /monthly/i });
    await user.click(monthlyButton);

    // *** FIX: Use findBy* to wait for the elements to appear after the re-render ***
    expect(await screen.findByLabelText(/on day/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/on the/i)).toBeInTheDocument();
  });
});