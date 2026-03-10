export type ColumnType = 'text' | 'number' | 'date' | 'select' | 'multiSelect' | 'checkbox' | 'formula' | 'url' | 'email';

export interface Column {
  id: string;
  name: string;
  type: ColumnType;
  width?: number;
  options?: string[];
  formula?: string;
  required?: boolean;
  createdAt: number;
}

export interface Cell {
  columnId: string;
  value: any;
  displayValue?: string;
}

export interface Row {
  id: string;
  cells: Cell[];
  createdAt: number;
  updatedAt: number;
}

export interface Filter {
  columnId: string;
  operator: 'equals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan' | 'isEmpty' | 'isNotEmpty';
  value: any;
}

export interface Sort {
  columnId: string;
  direction: 'asc' | 'desc';
}

export interface TableData {
  id: string;
  name: string;
  columns: Column[];
  rows: Row[];
  filters: Filter[];
  sorts: Sort[];
  createdAt: number;
  updatedAt: number;
}
