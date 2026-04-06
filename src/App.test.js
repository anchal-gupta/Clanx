import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('opens the gamification modal from the homepage', async () => {
  render(<App />);

  expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Gamification' })).toHaveAttribute('aria-current', 'page');

  await userEvent.click(screen.getByRole('button', { name: 'Enable Gamification' }));

  expect(screen.getByRole('dialog', { name: 'Create your reward system' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Select an event' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Select a reward' })).toBeInTheDocument();
});

test('allows selecting reward event and reward before create becomes enabled', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: 'Enable Gamification' }));

  const dialog = screen.getByRole('dialog', { name: 'Create your reward system' });

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select an event' }));
  await userEvent.click(screen.getByRole('option', { name: 'Cross $X in sales' }));
  expect(screen.getByPlaceholderText('e.g. 100')).toHaveAttribute('type', 'number');
  fireEvent.change(screen.getByPlaceholderText('e.g. 100'), { target: { value: '100' } });
  await userEvent.click(within(dialog).getByRole('button', { name: 'Save' }));

  expect(within(dialog).getByRole('button', { name: 'Cross $100 in sales' })).toBeInTheDocument();

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select a reward' }));
  await userEvent.click(screen.getByRole('option', { name: 'Flat $X bonus' }));
  fireEvent.change(screen.getByPlaceholderText('e.g. 100'), { target: { value: '100' } });
  await userEvent.click(within(dialog).getByRole('button', { name: 'Save' }));

  expect(within(dialog).getByRole('button', { name: 'Flat $100 bonus' })).toBeInTheDocument();
  expect(within(dialog).getByRole('button', { name: 'Create Reward' })).toHaveAttribute('aria-disabled', 'false');
});

test('immediately saves options without nested fields', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: 'Enable Gamification' }));

  const dialog = screen.getByRole('dialog', { name: 'Create your reward system' });

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select an event' }));
  await userEvent.click(screen.getByRole('option', { name: 'Is Onboarded' }));

  expect(within(dialog).getByRole('button', { name: 'Is Onboarded' })).toBeInTheDocument();
  expect(within(dialog).queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(1);
});

test('opens nested duration options from the posts selection', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: 'Enable Gamification' }));

  const dialog = screen.getByRole('dialog', { name: 'Create your reward system' });

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select an event' }));
  await userEvent.click(screen.getByRole('option', { name: 'Posts X times every Y period' }));
  expect(screen.getByPlaceholderText('e.g. 4')).toHaveAttribute('type', 'number');
  fireEvent.change(screen.getByPlaceholderText('e.g. 4'), { target: { value: '44' } });

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select duration' }));

  expect(screen.getByRole('button', { name: '14 days' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '1 month' })).toBeInTheDocument();
});

test('lets reward with upgrade via commission tier panel', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: 'Enable Gamification' }));

  const dialog = screen.getByRole('dialog', { name: 'Create your reward system' });

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select an event' }));
  await userEvent.click(screen.getByRole('option', { name: 'Cross $X in sales' }));
  expect(screen.getByPlaceholderText('e.g. 100')).toHaveAttribute('type', 'number');
  fireEvent.change(screen.getByPlaceholderText('e.g. 100'), { target: { value: '100' } });
  await userEvent.click(within(dialog).getByRole('button', { name: 'Save' }));

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select a reward' }));
  await userEvent.click(screen.getByRole('option', { name: 'Upgrade Commission Tier' }));

  expect(within(dialog).getByText('Select a commission tier')).toBeInTheDocument();

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select a tier' }));
  await userEvent.click(screen.getByRole('button', { name: 'Bronze' }));
  await userEvent.click(within(dialog).getByRole('button', { name: 'Save' }));

  expect(within(dialog).getByRole('button', { name: 'Upgrade to Bronze' })).toBeInTheDocument();
  expect(within(dialog).getByRole('button', { name: 'Create Reward' })).toHaveAttribute('aria-disabled', 'false');
});

test('disables commission tier reward when the event does not allow it', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: 'Enable Gamification' }));

  const dialog = screen.getByRole('dialog', { name: 'Create your reward system' });

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select an event' }));
  await userEvent.click(screen.getByRole('option', { name: 'Is Onboarded' }));

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select a reward' }));

  expect(screen.getByRole('option', { name: 'Upgrade Commission Tier' })).toBeDisabled();
});

test('shows a success toast when create reward is clicked in a valid state', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: 'Enable Gamification' }));

  const dialog = screen.getByRole('dialog', { name: 'Create your reward system' });

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select an event' }));
  await userEvent.click(screen.getByRole('option', { name: 'Cross $X in sales' }));
  fireEvent.change(screen.getByPlaceholderText('e.g. 100'), { target: { value: '100' } });
  await userEvent.click(within(dialog).getByRole('button', { name: 'Save' }));

  await userEvent.click(within(dialog).getByRole('button', { name: 'Select a reward' }));
  await userEvent.click(screen.getByRole('option', { name: 'Flat $X bonus' }));
  expect(screen.getByPlaceholderText('e.g. 100')).toHaveAttribute('type', 'number');
  fireEvent.change(screen.getByPlaceholderText('e.g. 100'), { target: { value: '100' } });
  await userEvent.click(within(dialog).getByRole('button', { name: 'Save' }));

  await userEvent.click(within(dialog).getByRole('button', { name: 'Create Reward' }));

  expect(screen.queryByRole('dialog', { name: 'Create your reward system' })).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Reward Created!');
});
