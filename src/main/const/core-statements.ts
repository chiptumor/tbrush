import { parseExpression } from "../function/parse-expression.ts";
import { NodeArray } from "../../parse/class/node-array.ts";
import type { StatementFunctionSet } from "../type/statement-function-set.ts";

export const CORE_STATEMENTS: StatementFunctionSet = {
  if(statement) {
    if (!statement.children) return [];
    if (statement.parameters === null) return statement.children;

    const condition = parseExpression(statement.parameters);

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

  for(statement) {
    if (!statement.children) return [];
    if (!statement.parameters) return statement.children;
    
    const REGEX = /^(\S+?)\s+(in|of)\s+(.+)$/;
    const parameters = statement.parameters.match(REGEX);

    if (!parameters) return [];
    
    const variableName = parameters[1];
    const keyword = parameters[2];
    const iterable = parseExpression(parameters[3]);

    const children = statement.children;
    const variables = statement.children.parameters;
    const nodes: NodeArray[] = [];
    
    switch (keyword) {
      case "in":
        for (const item in iterable)
          iterate(item);
        break;
      
      case "of":
        for (const item of iterable)
          iterate(item);
        break;
    }

    return nodes;
    
    function iterate(value) {
      const node = NodeArray.fromArray(children);
      node.variables = variables;
      node.variables.push({
        [variableName]: value
      });
      
      nodes.push(node);
    }
  },

  with(statement) {
    return "";
  }
};
