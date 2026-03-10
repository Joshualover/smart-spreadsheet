export interface FormulaContext {
  rowId: string;
  cells: Array<{ columnId: string; value: any }>;
}

export type FormulaFunction = (context: FormulaContext, ...args: any[]) => any;

export const formulaFunctions: Record<string, FormulaFunction> = {
  SUM: (context, columnId: string) => {
    return 0;
  },
  
  AVERAGE: (context, columnId: string) => {
    return 0;
  },
  
  COUNT: (context, columnId: string) => {
    return 0;
  },
  
  MAX: (context, columnId: string) => {
    return 0;
  },
  
  MIN: (context, columnId: string) => {
    return 0;
  },
  
  IF: (context, condition: string, trueValue: any, falseValue: any) => {
    try {
      const result = evalCondition(condition);
      return result ? trueValue : falseValue;
    } catch {
      return falseValue;
    }
  },
  
  CONCAT: (context, ...values: any[]) => {
    return values.join('');
  },
  
  TODAY: () => {
    return new Date().toISOString().split('T')[0];
  },
  
  UPPER: (context, value: string) => {
    return String(value).toUpperCase();
  },
  
  LOWER: (context, value: string) => {
    return String(value).toLowerCase();
  },
};

function evalCondition(condition: string): boolean {
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
