import type { Expression } from "../class/expression.ts";
import type { Scope } from "../class/scope.ts";
import type { Statement } from "../class/statement.ts";
import type { Template } from "../class/template.ts";

export type AnyNode = Scope | Template | Expression | Statement;
