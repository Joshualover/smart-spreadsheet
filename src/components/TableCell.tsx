import React from 'react';
import { Cell, Column } from '../types';
import { useTableStore } from '../store/tableStore';
import SelectCell from './cells/SelectCell';
import MultiSelectCell from './cells/MultiSelectCell';
import CheckboxCell from './cells/CheckboxCell';
import DateCell from './cells/DateCell';
import NumberCell from './cells/NumberCell';
import TextCell from './cells/TextCell';

interface TableCellProps {
  cell: Cell;
  column: Column;
  rowId: string;
}

const TableCell: React.FC<TableCellProps> = ({ cell, column, rowId }) => {
  const updateCell = useTableStore((state) => state.updateCell);
  const currentTable = useTableStore((state) => state.getCurrentTable());
  
  const handleChange = (value: any) => {
    if (currentTable) {
      updateCell(currentTable.id, rowId, column.id, value);
    }
  };
  
  const renderCell = () => {
    switch (column.type) {
      case 'select':
        return <SelectCell value={cell.value} onChange={handleChange} options={column.options || []} />;
      case 'multiSelect':
        return <MultiSelectCell value={cell.value} onChange={handleChange} options={column.options || []} />;
      case 'checkbox':
        return <CheckboxCell value={cell.value} onChange={handleChange} />;
      case 'date':
        return <DateCell value={cell.value} onChange={handleChange} />;
      case 'number':
        return <NumberCell value={cell.value} onChange={handleChange} />;
      case 'url':
        return <TextCell value={cell.value} onChange={handleChange} type="url" />;
      case 'email':
        return <TextCell value={cell.value} onChange={handleChange} type="email" />;
      case 'formula':
        return <div className="formula-cell">{cell.displayValue || cell.value}</div>;
      default:
        return <TextCell value={cell.value} onChange={handleChange} />;
    }
  };
  
  return (
    <div className="cell-content">
      {renderCell()}
    </div>
  );
};

export default TableCell;
