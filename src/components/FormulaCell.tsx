import React from 'react';

interface FormulaCellProps {
  formula: string;
  result?: any;
}

const FormulaCell: React.FC<FormulaCellProps> = ({ formula, result }) => {
  return (
    <div className="formula-cell-container">
      <div className="formula-display">{result !== undefined ? result : '计算中...'}</div>
      <div className="formula-hint" title={formula}>ƒ</div>
    </div>
  );
};

export default FormulaCell;
