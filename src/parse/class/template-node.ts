import type { BaseNode } from "../interface/base-node.ts";
import { NodeType } from "../enum/node-type.ts";

export class TemplateNode implements BaseNode<NodeType.Template> {
  type = NodeType.Template as const;
  content: string;

  constructor (content: string) {
    this.content = content;
  }
}
