import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewArticle from '../../src/pages/articles/new'; // Adjust the import path as needed

// Test 1: test the rendering of the NewArticle component
test('renders NewArticle component', () => {
    render(<NewArticle />);

    // Check if the form elements are present
    const titleInput = screen.getByLabelText('Title:');
    const sourceInput = screen.getByLabelText('Source:');
    const pubYearInput = screen.getByLabelText('Publication Year:');
    const doiInput = screen.getByLabelText('DOI:');
    const sePracticeInput = screen.getByLabelText('Method/practice:');
    const claimInput = screen.getByLabelText('Claim:');
    const evidenceInput = screen.getByLabelText('Result of Evidence:');
    const submitButton = screen.getByText('Submit');

    expect(titleInput).toBeInTheDocument();
    expect(sourceInput).toBeInTheDocument();
    expect(pubYearInput).toBeInTheDocument();
    expect(doiInput).toBeInTheDocument();
    expect(sePracticeInput).toBeInTheDocument();
    expect(claimInput).toBeInTheDocument();
    expect(evidenceInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});


// Test 2: tests form validation with empty fields
test('displays a warning message for empty fields', () => {
    render(<NewArticle />);

    const submitButton = screen.getByText('Submit');

    // Submit the form without filling in any fields
    fireEvent.click(submitButton);

    // Check if the warning message is displayed
    const warningMessage = screen.getByText('Please fill in all fields');
    expect(warningMessage).toBeInTheDocument();
});

// Test 3: test to ensure input fields work
test('can change input values', () => {
    render(<NewArticle />);

    // Find the input elements
    const titleInput = screen.getByLabelText('Title:') as HTMLInputElement;
    const sourceInput = screen.getByLabelText('Source:') as HTMLInputElement;
    const pubYearInput = screen.getByLabelText('Publication Year:') as HTMLInputElement;
    const doiInput = screen.getByLabelText('DOI:') as HTMLInputElement;
    const sePracticeInput = screen.getByLabelText('Method/practice:') as HTMLInputElement;
    const claimInput = screen.getByLabelText('Claim:') as HTMLInputElement;
    const evidenceInput = screen.getByLabelText('Result of Evidence:') as HTMLInputElement;

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'Sample Title' } });
    fireEvent.change(sourceInput, { target: { value: 'Sample Source' } });
    fireEvent.change(pubYearInput, { target: { value: '2023' } });
    fireEvent.change(doiInput, { target: { value: 'Sample DOI' } });
    fireEvent.change(sePracticeInput, { target: { value: 'Sample Practice' } });
    fireEvent.change(claimInput, { target: { value: 'Sample Claim' } });
    fireEvent.change(evidenceInput, { target: { value: 'Sample Evidence' } });

    // Check if the input values have changed
    expect(titleInput.value).toBe('Sample Title');
    expect(sourceInput.value).toBe('Sample Source');
    expect(pubYearInput.value).toBe('2023');
    expect(doiInput.value).toBe('Sample DOI');
    expect(sePracticeInput.value).toBe('Sample Practice');
    expect(claimInput.value).toBe('Sample Claim');
    expect(evidenceInput.value).toBe('Sample Evidence');
});
