import { compileTemplateVariables } from "../function/compile-template-variables.ts";
import { parseExpression } from "../function/parse-expression.ts";
import { NodeArray } from "../../parse/class/node-array.ts";
import type { Variables } from "../type/variables.ts";

export class StatementHelperObject {
  variables: Variables[][] = [];
  get lastScope(): Variables[] {
    return this.variables[this.variables.length - 1];
  }

  helper = Object.freeze({
    parseExpression: (expression: string): any =>
      parseExpression(expression, compileTemplateVariables(
        ...this.variables.flat()
      )),

    addVariablesToScope: (variables: Variables) => {
      this.lastScope.push(variables);
    },
    popLastVariables: () => {
      this.lastScope.pop();
    },
    emptyScope: () => {
      this.lastScope.length = 0;
    },

    NodeArray
  });
}

export type StatementHelper = StatementHelperObject["helper"];
