import React, { useState } from "react";
import styles from "./Tables.module.scss";
import axios from "axios";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const formatAuthors = (authors: string[] | undefined) => {
    if (authors && authors.length > 0) {
      return authors.join(", "); // Join authors with a comma and space
    }
    return ""; // Return an empty string if authors is undefined or empty
  };
  

const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString(undefined, options);
};

const AnalystSortableTable: React.FC<SortableTableProps> = ({
  headers,
  data,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: "", // The column to sort by
    direction: "ascending", // Sorting direction
  });

  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  const [editedSummary, setEditedSummary] = useState("");


// Inside handleApprove function for analysts
const handleApprove = async (index: number) => {
  const article = data[index];
  try {
    // Send a POST request to the server to approve the article as an analyst
    const response = await axios.post(
      `https://speed-backend-git-testing-leo-r-jia.vercel.app/api/articles/approveArticle?_id=${article._id}`,
      { "approved": true, "role": "analyst" } // Include the role in the request body
    );
    // Log the response for debugging
    console.log('Approve Response:', response);
    // Update the article in the state with the data returned by the server
    alert("Article Approved Successfully by Analyst! Now viewable by users.");
    setExpandedRowIndex(null);
  } catch (error) {
    // Log the error for debugging
    console.error('Approve Error:', error);
  }
};


// Inside handleReject function
const handleReject = async (index: number) => {
  const article = data[index];
  try {
    // Send a POST request to the server to reject the article
    const response = await axios.post(
      `https://speed-backend-git-testing-leo-r-jia.vercel.app/api/articles/rejectArticle?_id=${article._id}`, 
      { "rejected": true }
    );
    // Log the response for debugging
    console.log('Reject Response:', response);
    // Update the article in the state with the data returned by the server
    alert("Article Rejected Successfully.");
    setExpandedRowIndex(null);
  } catch (error) {
    // Log the error for debugging
    console.error('Reject Error:', error);
  }
}; 

  // Function to handle editing the summary
  const handleEditSummary = async (index: number) => {
    const article = data[index];
    try {
      // Send a POST request to the server to update the summary
      const response = await axios.post(
        `https://speed-backend-git-testing-leo-r-jia.vercel.app/api/articles/submitSummary?_id=${article._id}`,
        { "summary": editedSummary } // Send the edited summary
      );
      // Log the response for debugging
      console.log('Update Summary Response:', response);
      alert("Summary Updated Successfully");
      setExpandedRowIndex(null);
      
    // Clear the editedSummary when the row is closed or changed
      setEditedSummary("");
    } catch (error) {
      // Log the error for debugging
      console.error('Update Summary Error:', error);
    }
  };

  // Function to handle header click and update sorting state
  const handleSort = (column: string) => {
    setExpandedRowIndex(null);
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

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // If authors, take the first author for sorting
    if (sortConfig.key === 'authors' && Array.isArray(aValue) && Array.isArray(bValue)) {
      aValue = aValue[0];
      bValue = bValue[0];
    }

    // Handle the 'publication_year' or other numerical fields differently
    if (sortConfig.key === 'publication_year') {
      return (Number(aValue) - Number(bValue)) *
        (sortConfig.direction === 'ascending' ? 1 : -1);
    }

    // For other fields, proceed as before
    if (typeof aValue === "string" && typeof bValue === "string") {
      // Compare string values in a case-insensitive manner
      return aValue.localeCompare(bValue, undefined, { sensitivity: "base" }) *
        (sortConfig.direction === "ascending" ? 1 : -1);
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
          <>
            <tr 
              key={i} 
              onClick={() => setExpandedRowIndex(expandedRowIndex === i ? null : i)} // Toggle expanded row
            >
      {headers.map((header) => (
        <td key={header.key}>
          {header.key === "submission_date"
            ? formatDateString(row[header.key])
            : header.key === "authors"
            ? formatAuthors(row[header.key]) // Format authors using formatAuthors function
            : row[header.key]}
        </td>
      ))}
    </tr>
            {/* Expanded Section */}
            {expandedRowIndex === i && (
              <tr>
                <td colSpan={headers.length}>
                  <textarea
                    value={editedSummary}
                    onChange={(e) => setEditedSummary(e.target.value)}
                  />
                  <button onClick={() => handleEditSummary(i)}>Save Summary</button>
                  <button onClick={() => handleApprove(i)}>Approve</button>
                  <button onClick={() => handleReject(i)}>Reject</button>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default AnalystSortableTable;