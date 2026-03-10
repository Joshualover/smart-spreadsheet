import React from 'react';
import { useTableStore } from '../store/tableStore';
import { Column } from '../types';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import ColumnMenu from './ColumnMenu';

const Table: React.FC = () => {
  const currentTable = useTableStore((state) => state.getCurrentTable());
  const addRow = useTableStore((state) => state.addRow);
  const processedRows = useTableStore((state) => state.getProcessedRows(currentTable?.id || ''));
  
  const [menuColumn, setMenuColumn] = React.useState<{ column: Column; x: number; y: number } | null>(null);
  
  const handleAddRow = () => {
    if (currentTable) {
      addRow(currentTable.id);
    }
  };
  
  const handleRightClickColumn = (e: React.MouseEvent, column: Column) => {
    e.preventDefault();
    setMenuColumn({ column, x: e.clientX, y: e.clientY });
  };
  
  const handleCloseMenu = () => {
    setMenuColumn(null);
  };
  
  if (!currentTable) {
    return (
      <div className="empty-state">
        <div className="empty-content">
          <h2>还没有创建表格</h2>
          <p>点击左侧"新建表格"开始创建</p>
        </div>
      </div>
    );
  }
  
  if (currentTable.columns.length === 0) {
    return (
      <div className="empty-table">
        <div className="empty-content">
          <h2>表格还没有列</h2>
          <p>点击右上角"添加列"来创建第一列</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="smart-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <input type="checkbox" className="checkbox" />
              </th>
              {currentTable.columns.map((column) => (
                <th
                  key={column.id}
                  className="table-header-cell"
                  style={{ width: column.width || 200 }}
                  onContextMenu={(e) => handleRightClickColumn(e, column)}
                >
                  <TableHeader column={column} />
                </th>
              ))}
              <th className="actions-column"></th>
            </tr>
          </thead>
          <tbody>
            {processedRows.map((row) => (
              <TableRow key={row.id} row={row} columns={currentTable.columns} />
            ))}
          </tbody>
        </table>
        
        <button className="add-row-button" onClick={handleAddRow}>
          + 添加行
        </button>
      </div>
      
      {menuColumn && (
        <ColumnMenu
          column={menuColumn.column}
          position={{ x: menuColumn.x, y: menuColumn.y }}
          onClose={handleCloseMenu}
        />
      )}
    </div>
  );
};

export default Table;
