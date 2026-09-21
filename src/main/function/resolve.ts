import { compileTemplateVariables } from "./compile-template-variables.ts";
import { parseExpression } from "./parse-expression.ts";
import { Expression } from "../../parse/class/expression.ts";
import { Scope } from "../../parse/class/scope.ts";
import { Statement } from "../../parse/class/statement.ts";
import { Template } from "../../parse/class/scope.ts";
import type { StatementFunctionSet } from "../type/statement-function-set.ts";
import type { Variables } from "../type/variables.ts";
import type { AnyNode } from "../../parse/type/any-node.ts";

export function resolve(
  scope: Scope,
  upperVariables: Variables,
  statementFunctions: StatementFunctionSet
): string {
  const variables: Variables = {
    ...upperVariables,
    ...scope.variables
  };
  
  const resolved: AnyNode[] = [];
  
  for (const node of scope) {
    let result: AnyNode = node;
    while (result instanceof Statement)
      result = statementFunctions[node.keyword](node, variables);

    if (result instanceof Scope)
      result = resolve(result, variables, statementFunctions);

    resolved.push(result);
  }
  
  const templates: Template[] = [];
  
  for (const node of resolved) {
    const result: Template = node instanceof Expression
      ? new Template(node.content)
      : node;
    
    templates.push(result);
  }
  
  const final = templates.join("");
  
  return final;
}
