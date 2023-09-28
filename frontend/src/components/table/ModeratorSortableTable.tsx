import React, { useState } from "react";
import styles from "./Tables.module.scss";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const formatAuthors = (authors: string[]) => {
  return authors.join(", "); // Join authors with a comma and space
};

const ModeratorSortableTable: React.FC<SortableTableProps> = ({
  headers,
  data,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: "", // The column to sort by
    direction: "ascending", // Sorting direction
  });

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
      return sortConfig.direction === "ascending" ? "▲" : "▼"; // Up arrow or down arrow
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
          <tr key={i}>
            {headers.map((header) => (
              <td key={header.key}>{row[header.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ModeratorSortableTable;