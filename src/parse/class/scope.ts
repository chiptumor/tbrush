import { Statement } from "./statement.ts";
import { composeNodeTree } from "../function/compose-node-tree.ts";
import { composeTokenList } from "../../tokenize/function/compose-token-list.ts";
import type { AnyNode } from "../type/any-node.ts";
import type { Variables } from "../../main/type/variables.ts";

export class Scope extends Array<AnyNode> {
  variables: Variables = {};

  static fromIterable(nodes: Iterable<AnyNode>): Scope {
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

  override toString(): string {
    return this.join("");
  }
}
