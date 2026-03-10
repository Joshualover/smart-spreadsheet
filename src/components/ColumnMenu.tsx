import React, { useEffect, useRef } from 'react';
import { Column } from '../types';
import { useTableStore } from '../store/tableStore';

interface ColumnMenuProps {
  column: Column;
  position: { x: number; y: number };
  onClose: () => void;
}

const ColumnMenu: React.FC<ColumnMenuProps> = ({ column, position, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const deleteColumn = useTableStore((state) => state.deleteColumn);
  const currentTable = useTableStore((state) => state.getCurrentTable());
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  
  const handleDelete = () => {
    if (currentTable) {
      deleteColumn(currentTable.id, column.id);
    }
    onClose();
  };
  
  return (
    <div
      ref={menuRef}
      className="column-menu"
      style={{ left: position.x, top: position.y }}
    >
      <button className="menu-item" onClick={handleDelete}>
        删除列
      </button>
      <button className="menu-item" onClick={onClose}>
        取消
      </button>
    </div>
  );
};

export default ColumnMenu;
