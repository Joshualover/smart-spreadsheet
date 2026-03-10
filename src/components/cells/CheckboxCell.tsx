import React from 'react';

interface CheckboxCellProps {
  value: any;
  onChange: (value: any) => void;
}

const CheckboxCell: React.FC<CheckboxCellProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  
  return (
    <div className="checkbox-cell">
      <input
        type="checkbox"
        checked={value === true}
        onChange={handleChange}
        className="cell-checkbox"
      />
    </div>
  );
};

export default CheckboxCell;
