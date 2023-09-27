import React from "react";
import styles from "./table.module.scss"; 

interface ModeratorSortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const ModeratorSortableTable: React.FC<ModeratorSortableTableProps> = ({
  headers,
  data,
}) => (
  <table className={styles.myTable}> 
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.key} className={styles.key}> 
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td key={header.key} className={styles.key}>
              {row[header.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ModeratorSortableTable;
