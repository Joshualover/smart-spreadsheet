import React from 'react';
import { Row, Column } from '../types';
import { useTableStore } from '../store/tableStore';
import TableCell from './TableCell';

interface TableRowProps {
  row: Row;
  columns: Column[];
}

const TableRow: React.FC<TableRowProps> = ({ row, columns }) => {
  const deleteRow = useTableStore((state) => state.deleteRow);
  const currentTable = useTableStore((state) => state.getCurrentTable());
  
  const handleDelete = () => {
    if (currentTable && confirm('确定要删除这一行吗？')) {
      deleteRow(currentTable.id, row.id);
    }
  };
  
  return (
    <tr className="table-row">
      <td className="checkbox-cell">
        <input type="checkbox" className="checkbox" />
      </td>
      {columns.map((column) => {
        const cell = row.cells.find((c) => c.columnId === column.id);
        return (
          <td key={column.id} className="table-cell">
            <TableCell
              cell={cell || { columnId: column.id, value: null }}
              column={column}
              rowId={row.id}
            />
          </td>
        );
      })}
      <td className="actions-cell">
        <button
          className="delete-row-button"
          onClick={handleDelete}
          title="删除行"
        >
          ×
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
