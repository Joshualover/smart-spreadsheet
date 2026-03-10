import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Column, Row, Filter, Sort, TableData } from '../types';

interface TableStore {
  tables: TableData[];
  currentTableId: string | null;
  
  // Table operations
  createTable: (name: string) => void;
  deleteTable: (id: string) => void;
  setCurrentTable: (id: string | null) => void;
  getCurrentTable: () => TableData | null;
  
  // Column operations
  addColumn: (tableId: string, column: Omit<Column, 'id' | 'createdAt'>) => void;
  updateColumn: (tableId: string, columnId: string, updates: Partial<Column>) => void;
  deleteColumn: (tableId: string, columnId: string) => void;
  
  // Row operations
  addRow: (tableId: string) => void;
  updateRow: (tableId: string, rowId: string, updates: Partial<Row>) => void;
  deleteRow: (tableId: string, rowId: string) => void;
  
  // Cell operations
  updateCell: (tableId: string, rowId: string, columnId: string, value: any) => void;
  
  // Filter and Sort operations
  addFilter: (tableId: string, filter: Filter) => void;
  removeFilter: (tableId: string, columnId: string) => void;
  addSort: (tableId: string, sort: Sort) => void;
  removeSort: (tableId: string, columnId: string) => void;
  
  // Get filtered and sorted rows
  getProcessedRows: (tableId: string) => Row[];
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useTableStore = create<TableStore>()(
  persist(
    (set, get) => ({
      tables: [],
      currentTableId: null,
      
      createTable: (name: string) => {
        const newTable: TableData = {
          id: generateId(),
          name,
          columns: [],
          rows: [],
          filters: [],
          sorts: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({
          tables: [...state.tables, newTable],
          currentTableId: newTable.id,
        }));
      },
      
      deleteTable: (id: string) => {
        set((state) => ({
          tables: state.tables.filter((t) => t.id !== id),
          currentTableId: state.currentTableId === id ? null : state.currentTableId,
        }));
      },
      
      setCurrentTable: (id: string | null) => {
        set({ currentTableId: id });
      },
      
      getCurrentTable: () => {
        const { tables, currentTableId } = get();
        return tables.find((t) => t.id === currentTableId) || null;
      },
      
      addColumn: (tableId: string, columnData: Omit<Column, 'id' | 'createdAt'>) => {
        set((state) => {
          const tables = state.tables.map((table) => {
            if (table.id !== tableId) return table;
            
            const newColumn: Column = {
              ...columnData,
              id: generateId(),
              createdAt: Date.now(),
            };
            
            const rows = table.rows.map((row) => ({
              ...row,
              cells: [...row.cells, { columnId: newColumn.id, value: null }],
              updatedAt: Date.now(),
            }));
            
            return {
              ...table,
              columns: [...table.columns, newColumn],
              rows,
              updatedAt: Date.now(),
            };
          });
          
          return { tables };
        });
      },
      
      updateColumn: (tableId: string, columnId: string, updates: Partial<Column>) => {
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === tableId
              ? {
                  ...table,
                  columns: table.columns.map((col) =>
                    col.id === columnId ? { ...col, ...updates } : col
                  ),
                  updatedAt: Date.now(),
                }
              : table
          ),
        }));
      },
      
      deleteColumn: (tableId: string, columnId: string) => {
        set((state) => ({
          tables: state.tables.map((table) => {
            if (table.id !== tableId) return table;
            
            return {
              ...table,
              columns: table.columns.filter((col) => col.id !== columnId),
              rows: table.rows.map((row) => ({
                ...row,
                cells: row.cells.filter((cell) => cell.columnId !== columnId),
                updatedAt: Date.now(),
              })),
              updatedAt: Date.now(),
            };
          }),
        }));
      },
      
      addRow: (tableId: string) => {
        set((state) => {
          const tables = state.tables.map((table) => {
            if (table.id !== tableId) return table;
            
            const newRow: Row = {
              id: generateId(),
              cells: table.columns.map((col) => ({ columnId: col.id, value: null })),
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
            
            return {
              ...table,
              rows: [...table.rows, newRow],
              updatedAt: Date.now(),
            };
          });
          
          return { tables };
        });
      },
      
      updateRow: (tableId: string, rowId: string, updates: Partial<Row>) => {
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === tableId
              ? {
                  ...table,
                  rows: table.rows.map((row) =>
                    row.id === rowId ? { ...row, ...updates, updatedAt: Date.now() } : row
                  ),
                  updatedAt: Date.now(),
                }
              : table
          ),
        }));
      },
      
      deleteRow: (tableId: string, rowId: string) => {
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === tableId
              ? {
                  ...table,
                  rows: table.rows.filter((row) => row.id !== rowId),
                  updatedAt: Date.now(),
                }
              : table
          ),
        }));
      },
      
      updateCell: (tableId: string, rowId: string, columnId: string, value: any) => {
        set((state) => ({
          tables: state.tables.map((table) => {
            if (table.id !== tableId) return table;
            
            return {
              ...table,
              rows: table.rows.map((row) =>
                row.id === rowId
                  ? {
                      ...row,
                      cells: row.cells.map((cell) =>
                        cell.columnId === columnId ? { ...cell, value } : cell
                      ),
                      updatedAt: Date.now(),
                    }
                  : row
              ),
              updatedAt: Date.now(),
            };
          }),
        }));
      },
      
      addFilter: (tableId: string, filter: Filter) => {
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === tableId
              ? {
                  ...table,
                  filters: [...table.filters.filter((f) => f.columnId !== filter.columnId), filter],
                  updatedAt: Date.now(),
                }
              : table
          ),
        }));
      },
      
      removeFilter: (tableId: string, columnId: string) => {
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === tableId
              ? {
                  ...table,
                  filters: table.filters.filter((f) => f.columnId !== columnId),
                  updatedAt: Date.now(),
                }
              : table
          ),
        }));
      },
      
      addSort: (tableId: string, sort: Sort) => {
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === tableId
              ? {
                  ...table,
                  sorts: [...table.sorts.filter((s) => s.columnId !== sort.columnId), sort],
                  updatedAt: Date.now(),
                }
              : table
          ),
        }));
      },
      
      removeSort: (tableId: string, columnId: string) => {
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === tableId
              ? {
                  ...table,
                  sorts: table.sorts.filter((s) => s.columnId !== columnId),
                  updatedAt: Date.now(),
                }
              : table
          ),
        }));
      },
      
      getProcessedRows: (tableId: string) => {
        const { tables } = get();
        const table = tables.find((t) => t.id === tableId);
        if (!table) return [];
        
        let processedRows = [...table.rows];
        
        // Apply filters
        table.filters.forEach((filter) => {
          processedRows = processedRows.filter((row) => {
            const cell = row.cells.find((c) => c.columnId === filter.columnId);
            const value = cell?.value;
            
            switch (filter.operator) {
              case 'equals':
                return value === filter.value;
              case 'contains':
                return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
              case 'notContains':
                return !String(value).toLowerCase().includes(String(filter.value).toLowerCase());
              case 'greaterThan':
                return Number(value) > Number(filter.value);
              case 'lessThan':
                return Number(value) < Number(filter.value);
              case 'isEmpty':
                return !value || value === '';
              case 'isNotEmpty':
                return value && value !== '';
              default:
                return true;
            }
          });
        });
        
        // Apply sorts
        table.sorts.forEach((sort) => {
          processedRows.sort((a, b) => {
            const cellA = a.cells.find((c) => c.columnId === sort.columnId);
            const cellB = b.cells.find((c) => c.columnId === sort.columnId);
            const valueA = cellA?.value;
            const valueB = cellB?.value;
            
            let comparison = 0;
            if (typeof valueA === 'number' && typeof valueB === 'number') {
              comparison = valueA - valueB;
            } else {
              comparison = String(valueA).localeCompare(String(valueB));
            }
            
            return sort.direction === 'asc' ? comparison : -comparison;
          });
        });
        
        return processedRows;
      },
    }),
    {
      name: 'smart-spreadsheet-storage',
    }
  )
);
