import { Statement } from "./statement.ts";
import { Text } from "./text.ts";
import { composeNodeTree } from "../function/compose-node-tree.ts";
import { composeTokenList } from "../../tokenize/function/compose-token-list.ts";
import type { CoreNode } from "../type/core-node.ts";
import type { Template } from "../../main/class/template.ts";
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

  resolve(tbrushTemplate: Template, variables: Variables = {}): Text {
    const string = tbrushTemplate.resolveScope(this, variables);
    return new Text(string);
  }

  toString(): string {
    return this.join("");
  }
}
