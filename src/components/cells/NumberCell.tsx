import React, { useState } from 'react';

interface NumberCellProps {
  value: any;
  onChange: (value: any) => void;
}

const NumberCell: React.FC<NumberCellProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  
  const handleSave = () => {
    const numValue = inputValue === '' ? null : parseFloat(inputValue);
    onChange(numValue);
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setInputValue(value || '');
      setIsEditing(false);
    }
  };
  
  return (
    <div className="number-cell">
      {isEditing ? (
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="cell-input"
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>
          {value !== null && value !== undefined ? value : '-'}
        </span>
      )}
    </div>
  );
};

export default NumberCell;
