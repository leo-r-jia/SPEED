import React from "react";
import styles from "./table.module.scss"; // Import the CSS module

interface ModeratorSortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const ModeratorSortableTable: React.FC<ModeratorSortableTableProps> = ({
  headers,
  data,
}) => (
  <table className={styles.myTable}> {/* Use the CSS module class */}
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.key} className={styles.key}> {/* Use the CSS module class */}
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td key={header.key} className={styles.key}> {/* Use the CSS module class */}
              {row[header.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ModeratorSortableTable;
