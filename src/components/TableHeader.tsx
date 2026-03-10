import React, { useState } from 'react';
import { Column } from '../types';

interface TableHeaderProps {
  column: Column;
}

const TableHeader: React.FC<TableHeaderProps> = ({ column }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(column.name);
  
  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      text: '📝',
      number: '#',
      date: '📅',
      select: '▾',
      multiSelect: '☑',
      checkbox: '☐',
      formula: 'ƒ',
      url: '🔗',
      email: '✉️',
    };
    return icons[type] || '•';
  };
  
  const handleSave = () => {
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setName(column.name);
      setIsEditing(false);
    }
  };
  
  return (
    <div className="table-header">
      <span className="column-type-icon">{getTypeIcon(column.type)}</span>
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="column-name-input"
          autoFocus
        />
      ) : (
        <span className="column-name" onClick={() => setIsEditing(true)}>
          {column.name}
        </span>
      )}
      <div className="header-actions">
        <button className="header-action" title="排序">
          {column.type !== 'checkbox' && '↕'}
        </button>
        <button className="header-action" title="筛选">
          🔍
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
