import { BaseNode } from "./base-node.ts";
import type { Scope } from "./scope.ts";

export class Statement extends BaseNode {
  keyword: string;
  parameters: string | null;
  children: Scope | null;
  originalText: string = "";

  constructor (keyword: string, parameters: string | null, children: Scope | null) {
    super()
    this.keyword = keyword;
    this.parameters = parameters;
    this.children = children;
  }

  override toString(): string {
    return `{{@${ this.keyword }(${ this.parameters })}}${
      this.children
    }{{@/${ this.keyword }}}`;
  }
}
