import { BaseNode } from "./base-node.ts";

export class Expression extends BaseNode {
  content: string;
  originalText: string = "";

  constructor (content: string) {
    super();
    this.content = content;
  }

  toString(): string {
    return this.originalText;
  }
}
