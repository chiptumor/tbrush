import { NodeType } from "../enum/node-type.ts";
import type { StatementNode } from "./statement-node.ts";
import type { AnyNode } from "../type/any-node.ts";

export class NodeArray extends Array<AnyNode> {
  getChildStatement(keyword?: string): StatementNode {
    return this.find(i =>
      i.type === NodeType.Statement
      && keyword
        ? i.keyword === keyword
        : true
    ) as StatementNode;
  }

  getChildStatements(keyword?: string): StatementNode[] {
    return this.filter(i =>
      i.type === NodeType.Statement
      && keyword
        ? i.keyword === keyword
        : true
    ) as StatementNode[];
  }

  override toString(): string {
    return this.join("");
  }
}
