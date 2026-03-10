import React, { useState, useRef, useEffect } from 'react';

interface MultiSelectCellProps {
  value: any;
  onChange: (value: any) => void;
  options: string[];
}

const MultiSelectCell: React.FC<MultiSelectCellProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedValues = Array.isArray(value) ? value : [];
  
  const getColorForValue = (val: string) => {
    const colors = [
      '#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0',
      '#fce4ec', '#e0f7fa', '#f1f8e9', '#fffde7'
    ];
    const index = options.indexOf(val);
    return colors[index % colors.length];
  };
  
  const handleToggle = (option: string) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onChange(newValues.length > 0 ? newValues : null);
  };
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="multi-select-cell" ref={selectRef}>
      <div className="selected-tags" onClick={() => setIsOpen(!isOpen)}>
        {selectedValues.length > 0 ? (
          selectedValues.map((val) => (
            <span
              key={val}
              className="tag"
              style={{ backgroundColor: getColorForValue(val) }}
            >
              {val}
            </span>
          ))
        ) : (
          <span className="placeholder">选择...</span>
        )}
      </div>
      
      {isOpen && (
        <div className="multi-select-dropdown">
          {options.map((option) => (
            <label key={option} className="dropdown-option-checkbox">
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => handleToggle(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectCell;
