import React, { useState } from 'react';

interface TextCellProps {
  value: any;
  onChange: (value: any) => void;
  type?: 'text' | 'url' | 'email';
}

const TextCell: React.FC<TextCellProps> = ({ value, onChange, type = 'text' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  
  const handleSave = () => {
    onChange(inputValue);
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
  
  const renderContent = () => {
    if (isEditing) {
      return (
        <input
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="cell-input"
          autoFocus
        />
      );
    }
    
    const displayValue = value || '';
    
    if (type === 'url' && displayValue) {
      return (
        <a
          href={displayValue}
          target="_blank"
          rel="noopener noreferrer"
          className="url-link"
          onClick={(e) => e.stopPropagation()}
        >
          {displayValue}
        </a>
      );
    }
    
    if (type === 'email' && displayValue) {
      return (
        <a
          href={`mailto:${displayValue}`}
          className="email-link"
          onClick={(e) => e.stopPropagation()}
        >
          {displayValue}
        </a>
      );
    }
    
    return <span onClick={() => setIsEditing(true)}>{displayValue || '-'}</span>;
  };
  
  return <div className="text-cell">{renderContent()}</div>;
};

export default TextCell;
