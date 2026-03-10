import React, { useState, useRef, useEffect } from 'react';

interface SelectCellProps {
  value: any;
  onChange: (value: any) => void;
  options: string[];
}

const SelectCell: React.FC<SelectCellProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  const getColorForValue = (val: string) => {
    const colors = [
      '#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0',
      '#fce4ec', '#e0f7fa', '#f1f8e9', '#fffde7',
      '#eceff1', '#fbe9e7', '#e8eaf6', '#efebe9'
    ];
    const index = options.indexOf(val);
    return colors[index % colors.length];
  };
  
  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };
  
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
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
    <div className="select-cell" ref={selectRef} onClick={() => setIsOpen(!isOpen)}>
      {value ? (
        <div className="selected-option" style={{ backgroundColor: getColorForValue(value) }}>
          <span>{value}</span>
          <span className="clear-button" onClick={handleClear}>×</span>
        </div>
      ) : (
        <span className="placeholder">选择...</span>
      )}
      
      {isOpen && (
        <div className="select-dropdown">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectCell;
