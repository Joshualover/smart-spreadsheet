import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Table from './components/Table';
import AddColumnDialog from './components/AddColumnDialog';
import FilterPanel from './components/FilterPanel';
import { useTableStore } from './store/tableStore';
import { ColumnType } from './types';

const App: React.FC = () => {
  const currentTable = useTableStore((state) => state.getCurrentTable());
  const addColumn = useTableStore((state) => state.addColumn);
  const addFilter = useTableStore((state) => state.addFilter);
  const removeFilter = useTableStore((state) => state.removeFilter);
  
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [filterPanel, setFilterPanel] = useState<{ columnId: string; filter?: any } | null>(null);
  
  const handleAddColumn = (column: Omit<{ type: ColumnType; name: string; options?: string[] }, 'id' | 'createdAt'>) => {
    if (currentTable) {
      addColumn(currentTable.id, column);
    }
  };
  
  const handleAddFilter = (filter: any) => {
    if (currentTable) {
      addFilter(currentTable.id, filter);
    }
  };
  
  const handleRemoveFilter = () => {
    if (filterPanel && currentTable) {
      removeFilter(currentTable.id, filterPanel.columnId);
    }
  };
  
  return (
    <div className="app">
      <Sidebar />
      
      <main className="main-content">
        {currentTable && (
          <div className="toolbar">
            <h1 className="table-title">{currentTable.name}</h1>
            <div className="toolbar-actions">
              <button
                className="button button-primary"
                onClick={() => setShowAddColumn(true)}
              >
                + 添加列
              </button>
            </div>
          </div>
        )}
        
        <Table />
      </main>
      
      {showAddColumn && (
        <AddColumnDialog
          isOpen={showAddColumn}
          onClose={() => setShowAddColumn(false)}
          onAdd={handleAddColumn}
        />
      )}
      
      {filterPanel && (
        <div className="filter-panel-overlay">
          <div className="filter-panel-container">
            <FilterPanel
              columnId={filterPanel.columnId}
              isOpen={true}
              onClose={() => setFilterPanel(null)}
              onAddFilter={handleAddFilter}
              onRemoveFilter={handleRemoveFilter}
              currentFilter={filterPanel.filter}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
