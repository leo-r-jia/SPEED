import { render, fireEvent, screen, within } from "@testing-library/react";
import Articles, { ArticlesProps, ArticlesInterface } from "../../../src/pages/articles/moderator";
import "@testing-library/jest-dom";

describe("My Test Suite", () => {
  // test 1
  test('displays only submitted articles when "Submitted" tab is active', () => {
    const mockArticle: ArticlesInterface = {
      _id: "651a6662a685acb1c31f231a",
      title: "Software Development in the Modern Age",
      authors: "John Doe, Jane Smith",
      source: "Journal of Software Engineering",
      publication_year: "2023",
      doi: "10.1234/jse.2023.01",
      SE_practice: "Agile Development",
      claim: "Agile improves productivity",
      evidence: "Case studies from XYZ companies",
      approved: false,
      rejected: false,
    };

    const props: ArticlesProps = {
      articles: [mockArticle],
    };

    render(<Articles {...props} />);

    fireEvent.click(screen.getByText("Submitted"));

    expect(
      screen.getByText("Software Development in the Modern Age")
    ).toBeInTheDocument();
  });

  // test 2
  test('renders a single article correctly', () => {
    // Define props for a single article
    const mockProps = {
      articles: [
        {
          _id: '1',
          title: 'A Software Development',
          authors: 'Alice',
          source: 'Journal A',
          publication_year: '2022',
          doi: '10.1000/abcd1',
          SE_practice: 'TDD',
          claim: 'Improves code quality',
          evidence: 'Strong',
          approved: false,
          rejected: false,
        }
      ],
    };
  
    // Render the component with the single-article props
    render(<Articles {...mockProps} />);
  
    // Assert that the article's title is rendered
    expect(screen.getByText('A Software Development')).toBeInTheDocument();
  
    // Assert that the article's author is rendered
    expect(screen.getByText('Alice')).toBeInTheDocument();
  
    // Additional assertions for other properties...
    expect(screen.getByText('Journal A')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  // test 3
  test('renders article details correctly in a table row', () => {
    // Define props for a single article
    const mockProps = {
      articles: [
        {
          _id: '1',
          title: 'A Software Development',
          authors: 'Alice',
          source: 'Journal A',
          publication_year: '2022',
          doi: '10.1000/abcd1',
          SE_practice: 'TDD',
          claim: 'Improves code quality',
          evidence: 'Strong',
          approved: false,
          rejected: false,
        }
      ],
    };
  
    // Render the component with the single-article props
    render(<Articles {...mockProps} />);
  
    // Find the table row that contains the article details
    const articleRow = screen.getByRole('row', { name: /A Software Development Alice Journal A 2022/ });
  
    // Assert that the article details are rendered in the correct order within the row
    const cells = within(articleRow).getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('A Software Development');
    expect(cells[1]).toHaveTextContent('Alice');
    expect(cells[2]).toHaveTextContent('Journal A');
    expect(cells[3]).toHaveTextContent('2022');
  });

  //test 4
  test('displays an article when it is provided in the props', () => {
    // Define a mock article
    const mockArticle = {
      _id: '1',
      title: 'Test Article',
      authors: 'Test Author',
      source: 'Test Source',
      publication_year: '2022',
      doi: '10.1000/abcd1',
      SE_practice: 'TDD',
      claim: 'Improves code quality',
      evidence: 'Strong',
      approved: false,
      rejected: false,
    };
  
    // Render the component with the mock article
    render(<Articles articles={[mockArticle]} />);
  
    // Check if the article's title is rendered
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    // Similarly, you can add checks for other properties of the article
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    // ... and so on for the rest of the article properties you're rendering
  });
});