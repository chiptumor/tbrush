import { NodeType } from "../enum/node-type.ts";
import type { BaseNode } from "../interface/base-node.ts";
import type { NodeTree } from "../type/node-tree.ts";

export class StatementNode implements BaseNode<NodeType.Statement> {
  type = NodeType.Statement as const;
  keyword: string;
  parameters: string;
  children: NodeTree;

  constructor (props: {
    keyword: string;
    parameters: string;
    children: NodeTree;
  }) {
    this.keyword = props.keyword;
    this.parameters = props.parameters;
    this.children = props.children;
  }
}
