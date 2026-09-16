import type { StatementNode } from "../../parse/class/statement-node.ts";

export type StatementFunction =
  (this: StatementNode, statement: StatementNode) => string;
