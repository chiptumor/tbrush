import type { StatementNode } from "../class/statement-node.ts";
import type { NodeType } from "../enum/node-type.ts";

export interface BaseNode<T extends NodeType> {
  type: T;
  parent: StatementNode | null;
}
