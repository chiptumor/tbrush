import { NodeType } from "../enum/node-type.ts";
import type { StatementNode } from "./statement-node.ts";
import type { AnyNode } from "../type/any-node.ts";
import type { Variables } from "../../main/type/variables.ts";

export class NodeArray extends Array<AnyNode> {
  #variables: Variables[] = [];

  static fromArray(nodes: AnyNode[]): NodeArray {
    return new this(...nodes);
  }

  getFirstChildStatement(...keywords: string[]): StatementNode {
    return this.find(i => {
      if (i.type !== NodeType.Statement)
        return false;

      for (const keyword of keywords)
        if (i.keyword === keyword)
          return true;

      return false;
    }) as StatementNode;
  }

  getChildStatements(...keywords: string[]): StatementNode[] {
    return this.filter(i => {
      if (i.type !== NodeType.Statement)
        return false;

      for (const keyword of keywords)
        if (i.keyword === keyword)
          return true;

      return false;
    }) as StatementNode[];
  }

  override toString(): string {
    return this.join("");
  }
}
