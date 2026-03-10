import React, { useState } from 'react';
import { Filter } from '../types';

interface FilterPanelProps {
  columnId: string;
  isOpen: boolean;
  onClose: () => void;
  onAddFilter: (filter: Filter) => void;
  onRemoveFilter: () => void;
  currentFilter?: Filter;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ columnId, isOpen, onClose, onAddFilter, onRemoveFilter, currentFilter }) => {
  const [operator, setOperator] = useState<'equals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan' | 'isEmpty' | 'isNotEmpty'>(currentFilter?.operator || 'equals');
  const [value, setValue] = useState(currentFilter?.value || '');
  
  const handleApply = () => {
    onAddFilter({
      columnId,
      operator: operator as any,
      value,
    });
    onClose();
  };
  
  const handleRemove = () => {
    onRemoveFilter();
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="filter-panel">
      <div className="filter-row">
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="filter-select"
        >
          <option value="equals">等于</option>
          <option value="contains">包含</option>
          <option value="notContains">不包含</option>
          <option value="greaterThan">大于</option>
          <option value="lessThan">小于</option>
          <option value="isEmpty">为空</option>
          <option value="isNotEmpty">不为空</option>
        </select>
        
        {!['isEmpty', 'isNotEmpty'].includes(operator) && (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="筛选值"
            className="filter-input"
          />
        )}
      </div>
      
      <div className="filter-actions">
        <button className="button button-small" onClick={handleApply}>
          应用
        </button>
        {currentFilter && (
          <button className="button button-small button-danger" onClick={handleRemove}>
            清除
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
