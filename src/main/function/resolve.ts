import { parseExpression } from "./parse-expression.ts";
import { Expression } from "../../parse/class/expression.ts";
import { Scope } from "../../parse/class/scope.ts";
import { Statement } from "../../parse/class/statement.ts";
import { Template } from "../../parse/class/template.ts";
import type { Variables } from "../type/variables.ts";
import type { CoreNode } from "../../parse/type/core-node.ts";

export function resolve(
  scope: Scope,
  upperVariables: Variables,
  statementCallback:
    (statement: Statement, variables: Variables) => CoreNode | CoreNode[]
): string {
  const variables: Variables = {
    ...upperVariables,
    ...scope.variables
  };
  
  const resolved: (Expression | Template)[] = [];
  
  for (const item of scope) {
    let node: CoreNode = item;
    while (node instanceof Statement) {
      const statement = statementCallback(node, variables);
      if (statement instanceof Array && !(statement instanceof Scope))
        node = Scope.fromIterable(statement);
      else
        node = statement;
    }

    if (node instanceof Scope) {
      const string = resolve(node, variables, statementCallback);
      node = new Template(string);
    }

    resolved.push(node);
  }
  
  const templates: Template[] = [];
  
  for (const node of resolved) {
    const result: Template = node instanceof Expression
      ? new Template(parseExpression(node.content))
      : node;
    
    templates.push(result);
  }
  
  const final = templates.join("");
  
  return final;
}
