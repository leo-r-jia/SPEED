import { render, fireEvent, screen } from "@testing-library/react";
import Articles from "../../src/pages/articles/moderator";
import SortableTable from "../../src/components/table/SortableTable"; // Import the SortableTable component
import ColumnDropdown from "../../src/pages/articles/ColumnDropdown"

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

});
