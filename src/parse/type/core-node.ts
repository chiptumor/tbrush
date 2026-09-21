import type { Expression } from "../class/expression.ts";
import type { Scope } from "../class/scope.ts";
import type { Statement } from "../class/statement.ts";
import type { Template } from "../class/template.ts";

export type CoreNode = Scope | Template | Expression | Statement;
