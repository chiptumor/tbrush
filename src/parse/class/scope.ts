import { Statement } from "./statement.ts";
import { Template } from "./template.ts";
import { composeNodeTree } from "../function/compose-node-tree.ts";
import { resolve } from "../../main/function/resolve.ts";
import { composeTokenList } from "../../tokenize/function/compose-token-list.ts";
import type { CoreNode } from "../type/core-node.ts";
import type { TBrushTemplate } from "../../main/class/tbrush-template.ts";
import type { Variables } from "../../main/type/variables.ts";

export class Scope extends Array<CoreNode> {
  variables: Variables = {};

  static fromIterable(nodes: Iterable<CoreNode>): Scope {
    return new this(...nodes);
  }

  static fromString(string: string): Scope {
    const list = composeTokenList(string);
    const tree = composeNodeTree(list);
    return tree;
  }

  getFirstChildStatement(...keywords: string[]): Statement {
    return this.find(i => {
      if (!(i instanceof Statement))
        return false;

      for (const keyword of keywords)
        if (i.keyword === keyword)
          return true;

      return false;
    }) as Statement;
  }

  getChildStatements(...keywords: string[]): Statement[] {
    return this.filter(i => {
      if (!(i instanceof Statement))
        return false;

      for (const keyword of keywords)
        if (i.keyword === keyword)
          return true;

      return false;
    }) as Statement[];
  }

  resolve(tbrushTemplate: TBrushTemplate, variables: Variables = {}): Template {
    const string = tbrushTemplate.resolveScope(this, variables);
    return new Template(string);
  }

  override toString(): string {
    return this.join("");
  }
}
