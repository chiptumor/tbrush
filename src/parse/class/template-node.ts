import { NodeType } from "../enum/node-type.ts";
import type { StatementNode } from "./statement-node.ts";
import type { BaseNode } from "../interface/base-node.ts";

export class TemplateNode implements BaseNode<NodeType.Template> {
  type = NodeType.Template as const;
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
    return this.content;
  }
}
