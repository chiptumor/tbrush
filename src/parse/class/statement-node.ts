import { NodeArray } from "./node-array.ts";
import { NodeType } from "../enum/node-type.ts";
import type { BaseNode } from "../interface/base-node.ts";

export class StatementNode implements BaseNode<NodeType.Statement> {
  type = NodeType.Statement as const;
  parent: StatementNode | null;
  keyword: string;
  parameters: string;
  children: NodeArray | null;

  constructor (props: {
    parent: StatementNode | null;
    keyword: string;
    parameters: string;
    children: NodeArray | null;
  }) {
    this.parent = props.parent;
    this.keyword = props.keyword;
    this.parameters = props.parameters;
    this.children = props.children;
  }

  toString(): string {
    return `{{@${ this.keyword }(${ this.parameters })}}${
      this.children
    }{{@/${ this.keyword }}}`;
  }
}
