import type { AnyNode } from "../type/any-node.ts";

export class NodeArray extends Array<AnyNode> {
  override toString(): string {
    return this.join("");
  }
}
