import React, { useState } from "react";
import styles from "./Tables.module.scss";
import Rating from '@mui/material/Rating';
import axios from "axios";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const convertRatingToStars = (rating: number) => {
  // Returns Rating component
  return (<Rating name="read-only" value={rating} precision={0.5} size="small" readOnly />);
};

const formatAuthors = (authors: string[]) => {
  return authors.join(", "); // Join authors with a comma and space
};

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  // For rating
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const [value, setValue] = React.useState<number | null>(0);

  const handleRatingSubmission = async (index: number, rating: number | null) => {
    const article = data[index];
    try {
      // Send a POST request to the server to rate the article
      const response = await axios.post(
        `https://speed-backend-git-testing-leo-r-jia.vercel.app/api/articles/rate?_id=${article._id}`,
        { "rating": rating }
      );
      // Log the response for debugging
      console.log('Rating Response:', response);

      // Close the rating submission
      setExpandedRowIndex(null);
      setValue(0);
    } catch (error) {
      // Log the error for debugging
      console.error('Rating Error:', error);
    }
  };

  // Function to handle header click and update sorting state
  const handleSort = (column: string) => {
    // If clicking on the same column, toggle sorting direction
    if (sortConfig.key === column) {
      const newDirection =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
      setSortConfig({ key: column, direction: newDirection });
    } else {
      // Clicking on a different column, set it as the sorting column
      setSortConfig({ key: column, direction: "ascending" });
    }
  };

  // Get the sorting indicator (arrow) based on the sorting direction
  const getSortingIndicator = (columnKey: string) => {
    if (columnKey === sortConfig.key) {
      return sortConfig.direction === "ascending" ? "▼" : "▲"; // Up arrow or down arrow
    }
    return ""; // No arrow for other columns
  };

  // Sort the data based on the current sortConfig
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) {
      return 0; // No sorting, return the same order
    }

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <table className={styles.myTable}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              onClick={() => handleSort(header.key)}
              className={header.key === sortConfig.key ? styles.active : ""}
            >
              {header.label}{" "}
              <span className={styles.sortIndicator}>
                {getSortingIndicator(header.key)}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <React.Fragment key={i}>
            <tr
              key={i}
              onClick={() => {
                setExpandedRowIndex(expandedRowIndex === i ? null : i);
                setValue(0); // Reset rating every time a new row is clicked
              }} // Toggle expanded row
            >
              {headers.map((header) => (
                <td key={header.key}>
                  {header.key === "authors"
                    ? formatAuthors(row[header.key])
                    : header.key === "averageRating"
                      ? convertRatingToStars(row[header.key])
                      : row[header.key]}
                </td>
              ))}
            </tr>
            {/* Expanded row with Rating */}
            {expandedRowIndex === i && (
              <tr>
                <td colSpan={headers.length}>
                  <div className={styles.submitRating}>
                    <Rating
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                    <button onClick={() => handleRatingSubmission(i, value)}>
                      Submit Rating
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
