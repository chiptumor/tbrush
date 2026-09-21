import { CORE_STATEMENTS } from "../const/core-statements.ts";
import { resolve } from "../function/resolve.ts";
import { Scope } from "../../parse/class/scope.ts";
import { composeNodeTree } from "../../parse/function/compose-node-tree.ts";
import { composeTokenList } from "../../tokenize/function/compose-token-list.ts";
import type { TBrushConfig } from "../interface/tbrush-config.ts";
import type { StatementCallback } from "../type/statement-callback.ts";
import type { StatementFunctionSet } from "../type/statement-function-set.ts";
import type { TemplateObject } from "../type/template-object.ts";
import type { Variables } from "../type/variables.ts";

export class TBrushTemplate {
  #tree: Scope;
  
  #config: TBrushConfig | undefined;

  statementFunctions: StatementFunctionSet = {
    ...CORE_STATEMENTS
  };

  constructor (page: string, config?: TBrushConfig) {
    this.#config = config;

    const list = composeTokenList(page);
    this.#tree = composeNodeTree(list);
  }

  addStatements(statements: StatementFunctionSet) {
    for (const statement in statements)
      this.statementFunctions[statement] = statements[statement];
  }
  removeStatements(...keywords: string[]) {
    for (const keyword of keywords)
      delete this.statementFunctions[keyword];
  }
  
  getStatementCallback(variables: Variables): StatementCallback {
    return (statement, vars) =>
      this.statementFunctions[statement.keyword]?.(statement, {
        ...variables,
        ...vars
      }, this)
        ?? statement.children;
  }

  resolveScope(scope: Scope, variables: Variables): string {
    // supplies own statement config
    return resolve(scope, variables, this.getStatementCallback(variables));
  }

  apply(template: TemplateObject): string {
    return String(resolve(
      this.#tree,
      template,
      this.getStatementCallback(template)
    ));
  }
}
