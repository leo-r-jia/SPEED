import { render, fireEvent, screen } from "@testing-library/react";
import Articles from "../../src/pages/articles/moderator";
import SortableTable from "../../src/components/table/SortableTable";
import ColumnDropdown from "../../src/pages/articles/ColumnDropdown"
import NewArticle from '../../src/pages/articles/new';

import "@testing-library/jest-dom";

describe("My Test Suite", () => {
  // Test 1: Displays an article when it is provided in the props
  test('displays an article when it is provided in the props', () => {
    const mockArticle = {
      id: "1",
      title: "Test Article",
      authors: "Test Author",
      source: "Test Source",
      publication_year: "2022",
      doi: "10.1000/abcd1",
      SE_practice: "TDD",
      claim: "Improves code quality",
      evidence: "Strong",
      approved: false,
      rejected: false,
      submission_date: "2022-09-27",
      moderatorApproved: false,
      analystApproved: false,
    };

    render(<Articles articles={[mockArticle]} />);

    // Check if the article's title is rendered
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    // Similarly, you can add checks for other properties of the article
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    // ... and so on for the rest of the article properties you're rendering
  });

  // Test 2: Check if the "Rejected" tab is initially inactive
  test('initially has the "Rejected" tab inactive', () => {
    render(<Articles articles={[]} />);
    expect(screen.getByText('Rejected')).not.toHaveClass('active');
  });

  // Test 3: Check if the "Approved" tab is initially inactive
  test('initially has the "Approved" tab inactive', () => {
    render(<Articles articles={[]} />);
    expect(screen.getByText('Approved')).not.toHaveClass('active');
  });

  // Test 4: renders the data for SortableTable component
  test('renders the SortableTable component', () => {
    // Define test data for the SortableTable
    const headers = [
      { key: "title", label: "Title" },
      { key: "authors", label: "Authors" },
      { key: "publication_year", label: "Publication Year" },
    ];

    const data = [
      {
        title: "Test Article 1",
        authors: ["Author 1", "Author 2"],
        publication_year: 2021,
      },
      {
        title: "Test Article 2",
        authors: ["Author 3", "Author 4"],
        publication_year: 2022,
      },
    ];

    render(
      <SortableTable
        headers={headers}
        data={data}
        selectedColumns={["title", "authors", "publication_year"]}
      />
    );

    // Check if the table headers are rendered
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Authors")).toBeInTheDocument();
    expect(screen.getByText("Publication Year")).toBeInTheDocument();

    // Check if the table data is rendered
    expect(screen.getByText("Test Article 1")).toBeInTheDocument();
    expect(screen.getByText("Author 1, Author 2")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("Test Article 2")).toBeInTheDocument();
    expect(screen.getByText("Author 3, Author 4")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
  });

  // Test 5: test the rendering of the NewArticle component
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


  // Test 6: tests form validation with empty fields
  test('displays a warning message for empty fields', () => {
    render(<NewArticle />);

    const submitButton = screen.getByText('Submit');

    // Submit the form without filling in any fields
    fireEvent.click(submitButton);

    // Check if the warning message is displayed
    const warningMessage = screen.getByText('Please fill in all fields');
    expect(warningMessage).toBeInTheDocument();
  });

  // Test 7: test to ensure input fields work
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

});
