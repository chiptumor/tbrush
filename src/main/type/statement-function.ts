import type { Variables } from "./variables.ts";
import type { Statement } from "../../parse/class/statement.ts";
import type { Scope } from "../../parse/class/scope.ts";
import type { AnyNode } from "../../parse/type/any-node.ts";

export type StatementFunction =
  (context: Statement, variables: Variables)
    =>
      | AnyNode | Scope
      | (AnyNode | Scope)[];
