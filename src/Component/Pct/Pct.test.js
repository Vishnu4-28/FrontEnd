import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pct from './Pct';

test('renders the correct initial message and updates it on button click', async () => {
  // Render the App component
  render(<Pct />);

  // Find the element that displays the message
  const messageElement = screen.getByTestId('message');  
  expect(messageElement).toHaveTextContent('Hello World'); // Initial expectation

  // Find the button and click it
  const buttonElement = screen.getByRole('button', { name: 'Click Me' });
  fireEvent.click(buttonElement);

  // Wait for the state update
  await waitFor(() => {
    expect(screen.getByTestId('message')).toHaveTextContent('Button Clicked');
  });
});