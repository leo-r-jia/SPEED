import React from 'react';
import styles from "../../../pages/articles/UserView.module.scss"

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    searchBy: string;
    onSearchByChange: (field: "title" | "authors" | "source") => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, searchBy, onSearchByChange }) => {
    return (
        <div>
            <input
                className={styles.searchBar}
                type="text"
                placeholder="Search..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <select
                value={searchBy}
                onChange={e => onSearchByChange(e.target.value as "title" | "authors" | "source")}
                className={styles.searchDropdown}
            >
                <option value="title">Title</option>
                <option value="authors">Authors</option>
                <option value="source">Source</option>
            </select>
        </div>
    );
}

export default SearchBar;
