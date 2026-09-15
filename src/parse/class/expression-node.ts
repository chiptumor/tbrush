import type { StatementNode } from "./statement-node.ts";
import type { BaseNode } from "../interface/base-node.ts";
import { NodeType } from "../enum/node-type.ts";

export class ExpressionNode implements BaseNode<NodeType.Expression> {
  type = NodeType.Expression as const;
  parent: StatementNode | null;
  content: string;

  constructor (props: {
    parent: StatementNode | null;
    content: string;
  }) {
    this.parent = props.parent;
    this.content = props.content;
  }

  toString(): string {
    return "{{ " + this.content + " }}";
  }
}
