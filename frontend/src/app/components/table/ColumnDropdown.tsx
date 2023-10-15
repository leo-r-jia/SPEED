import React, { useState } from "react";
import styles from './ColumnDropdown.module.scss'; // Import the SCSS module


interface ColumnOption {
  key: string;
  label: string;
}

interface ColumnDropdownProps {
  options: ColumnOption[];
  selectedOptions: string[];
  onSelect: (selected: string[]) => void;
}

const ColumnDropdown: React.FC<ColumnDropdownProps> = ({
    options,
    selectedOptions,
    onSelect,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const toggleOption = (optionKey: string) => {
      const updatedSelected = selectedOptions.includes(optionKey)
        ? selectedOptions.filter((key) => key !== optionKey)
        : [...selectedOptions, optionKey];
  
      onSelect(updatedSelected);
    };
  
    return (
      <div className={`${styles["column-dropdown"]} ${isOpen ? styles["open"] : ""}`}>
        <div className={styles["dropdown-toggle"]} onClick={toggleDropdown}>
          Select Columns
        </div>
        {isOpen && (
          <ul className={styles["dropdown-options"]}>
            {options.map((option) => (
              <li
                key={option.key}
                onClick={() => toggleOption(option.key)}
                className={`${selectedOptions.includes(option.key) ? styles["selected"] : ""}`}
              >
                {option.label}
                {selectedOptions.includes(option.key) && (
                  <span className={styles["checkmark"]}>&#10003;</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default ColumnDropdown;