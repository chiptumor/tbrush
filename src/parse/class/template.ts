import type { Statement } from "./statement.ts";
import { BaseNode } from "./base-node.ts";

export class Template extends BaseNode {
  content: string;

  constructor (content: string) {
    super();
    this.content = content;
  }

  toString(): string {
    return this.content;
  }
}
