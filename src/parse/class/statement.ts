import { Scope } from "./scope.ts";
import { composeNodeTree } from "../function/compose-node-tree.ts";
import type { BaseNode } from "../interface/base-node.ts";
import type { TokenList } from "../../tokenize/type/token-list.ts";

export class Statement implements BaseNode {
  parent: Statement | null;
  keyword: string;
  parameters: string | null;
  children: Scope | null;

  constructor (props: {
    parent: Statement | null;
    keyword: string;
    parameters: string | null;
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
