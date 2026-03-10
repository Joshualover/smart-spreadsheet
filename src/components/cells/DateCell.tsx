import React, { useState } from 'react';
import { format } from 'date-fns';

interface DateCellProps {
  value: any;
  onChange: (value: any) => void;
}

const DateCell: React.FC<DateCellProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    onChange(dateValue || null);
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    try {
      return format(new Date(dateStr), 'yyyy-MM-dd');
    } catch {
      return dateStr;
    }
  };
  
  return (
    <div className="date-cell">
      {isEditing ? (
        <input
          type="date"
          defaultValue={value || ''}
          onBlur={handleSave}
          onChange={handleSave}
          onKeyDown={handleKeyDown}
          className="cell-input"
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{formatDate(value)}</span>
      )}
    </div>
  );
};

export default DateCell;
