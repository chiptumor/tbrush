import type { StatementFunctionSet } from "../type/statement-function-set.ts";

export const CORE_STATEMENTS: StatementFunctionSet = {
  if(statement, helper) {
    if (!statement.children) return [];
    if (statement.parameters === null) return statement.children;

    const condition = helper.parseExpression(statement.parameters);

    const elseStatement = statement.children.getFirstChildStatement("else");
    if (elseStatement) {
      const elseIndex = statement.children.indexOf(elseStatement);

      const trueBody = statement.children.slice(0, elseIndex);
      const falseBody = statement.children.slice(elseIndex + 1);
      
      if (condition)
        return trueBody;
      else
        return falseBody;
    } else {
      if (condition)
        return statement.children;
      else
        return [];
    }
  },

  for(statement, helper) {
    if (!statement.children) return [];
    if (!statement.parameters) return statement.children;

    const parameters = statement.parameters.match(/^(\S+?)\s+(in|of)\s+(.+)$/);

    if (!parameters) return [];

    const [ _, variableName, keyword, iterable ] = parameters;

    return "";
  },

  with(statement, helper) {
    return "";
  }
};
