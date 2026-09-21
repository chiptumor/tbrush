import { BaseNode } from "./base-node.ts";

export class Text extends BaseNode {
  content: string;

  constructor (content: string) {
    super();
    this.content = content;
  }

  toString(): string {
    return this.content;
  }
}
