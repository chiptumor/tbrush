import { Scope } from "../../parse/class/scope.ts";
import type { StatementFunctionSet } from "../type/statement-function-set.ts";
import type { Variables } from "../type/variables.ts";

export function resolve(
  scope: Scope,
  variables: Variables,
  statementFunctions: StatementFunctionSet
): string {
  let finished: boolean = false;
  while (!finished) {
    finished = true;

    for (const node of scope) {
      // TODO
    }
  }
}
