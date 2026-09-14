import type { BaseNode } from "../interface/base-node.ts";
import { NodeType } from "../enum/node-type.ts";

export class ExpressionNode implements BaseNode<NodeType.Expression> {
  type = NodeType.Expression as const;
  content: string;

  constructor (content: string) {
    this.content = content;
  }
}
