import { NodeArray } from "./node-array.ts";
import { NodeType } from "../enum/node-type.ts";
import { composeNodeTree } from "../function/compose-node-tree.ts";
import type { BaseNode } from "../interface/base-node.ts";
import type { TokenList } from "../../tokenize/type/token-list.ts";

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
    children: TokenList | null;
  }) {
    this.parent = props.parent;
    this.keyword = props.keyword;
    this.parameters = props.parameters;
    this.children = props.children
      ? composeNodeTree(props.children, this)
      : null;
  }

  toString(): string {
    return `{{@${ this.keyword }(${ this.parameters })}}${
      this.children
    }{{@/${ this.keyword }}}`;
  }
}
