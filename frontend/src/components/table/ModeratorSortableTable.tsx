// src/components/table/ModeratorSortableTable.tsx
import React from "react";

interface ModeratorSortableTableProps {
    headers: { key: string; label: string }[];
    data: any[];
}

const ModeratorSortableTable: React.FC<ModeratorSortableTableProps> = ({ headers, data }) => (
    <table>
        <thead>
            <tr>
                {headers.map((header) => (
                    <th key={header.key}>{header.label}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                    {headers.map((header) => (
                        <td key={header.key} style={{ backgroundColor: row[header.key] === 'High' ? 'red' : 'white' }}>
                            {row[header.key]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);


export default ModeratorSortableTable;