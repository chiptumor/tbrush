import { Scope } from "./scope.ts";
import { composeNodeTree } from "../function/compose-node-tree.ts";
import { BaseNode } from "./base-node.ts";
import type { TokenList } from "../../tokenize/type/token-list.ts";

export class Statement extends BaseNode {
  keyword: string;
  parameters: string | null;
  children: Scope | null;

  constructor (keyword: string, parameters: string | null, children: Scope | null) {
    super()
    this.keyword = keyword;
    this.parameters = parameters;
    this.children = children;
  }

  toString(): string {
    return `{{@${ this.keyword }(${ this.parameters })}}${
      this.children
    }{{@/${ this.keyword }}}`;
  }
}
