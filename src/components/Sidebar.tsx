import React, { useState } from 'react';
import { useTableStore } from '../store/tableStore';

const Sidebar: React.FC = () => {
  const tables = useTableStore((state) => state.tables);
  const currentTableId = useTableStore((state) => state.currentTableId);
  const createTable = useTableStore((state) => state.createTable);
  const deleteTable = useTableStore((state) => state.deleteTable);
  const setCurrentTable = useTableStore((state) => state.setCurrentTable);
  
  const [showNewTableDialog, setShowNewTableDialog] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  
  const handleCreateTable = () => {
    if (newTableName.trim()) {
      createTable(newTableName.trim());
      setNewTableName('');
      setShowNewTableDialog(false);
    }
  };
  
  const handleDeleteTable = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确定要删除这个表格吗？')) {
      deleteTable(id);
    }
  };
  
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>📊 智能数据库</h2>
        <button
          className="button button-primary"
          onClick={() => setShowNewTableDialog(true)}
        >
          + 新建表格
        </button>
      </div>
      
      <div className="table-list">
        {tables.length === 0 ? (
          <div className="empty-message">
            还没有表格，点击上方按钮创建
          </div>
        ) : (
          tables.map((table) => (
            <div
              key={table.id}
              className={`table-item ${currentTableId === table.id ? 'active' : ''}`}
              onClick={() => setCurrentTable(table.id)}
            >
              <span className="table-name">{table.name}</span>
              <button
                className="delete-table-button"
                onClick={(e) => handleDeleteTable(table.id, e)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
      
      {showNewTableDialog && (
        <div className="dialog-overlay" onClick={() => setShowNewTableDialog(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>新建表格</h3>
            <input
              type="text"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              placeholder="表格名称"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleCreateTable()}
            />
            <div className="dialog-footer">
              <button
                className="button button-secondary"
                onClick={() => setShowNewTableDialog(false)}
              >
                取消
              </button>
              <button className="button button-primary" onClick={handleCreateTable}>
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
