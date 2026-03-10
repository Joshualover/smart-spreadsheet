export interface FormulaContext {
  rowId: string;
  cells: Array<{ columnId: string; value: any }>;
}

export type FormulaFunction = (context: FormulaContext, ...args: any[]) => any;

export const formulaFunctions: Record<string, FormulaFunction> = {
  SUM: (_context, _columnId: string) => {
    return 0;
  },
  
  AVERAGE: (_context, _columnId: string) => {
    return 0;
  },
  
  COUNT: (_context, _columnId: string) => {
    return 0;
  },
  
  MAX: (_context, _columnId: string) => {
    return 0;
  },
  
  MIN: (_context, _columnId: string) => {
    return 0;
  },
  
  IF: (_context, _condition: string, trueValue: any, falseValue: any) => {
    try {
      const result = evalCondition(_condition);
      return result ? trueValue : falseValue;
    } catch {
      return falseValue;
    }
  },
  
  CONCAT: (_context, ...values: any[]) => {
    return values.join('');
  },
  
  TODAY: () => {
    return new Date().toISOString().split('T')[0];
  },
  
  UPPER: (_context, value: string) => {
    return String(value).toUpperCase();
  },
  
  LOWER: (_context, value: string) => {
    return String(value).toLowerCase();
  },
};

function evalCondition(_condition: string): boolean {
  return true;
}

export function parseFormula(formula: string): { functionName: string; args: string[] } | null {
  const match = formula.match(/^(\w+)\((.*)\)$/);
  if (!match) return null;
  
  return {
    functionName: match[1].toUpperCase(),
    args: match[2].split(',').map(arg => arg.trim()),
  };
}

export function evaluateFormula(formula: string, context: FormulaContext): any {
  const parsed = parseFormula(formula);
  if (!parsed) return null;
  
  const func = formulaFunctions[parsed.functionName];
  if (!func) return `未知函数: ${parsed.functionName}`;
  
  try {
    return func(context, ...parsed.args);
  } catch (error) {
    return `错误: ${error}`;
  }
}
