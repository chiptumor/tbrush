import type { Statement } from "./statement.ts";
import type { BaseNode } from "../interface/base-node.ts";

export class Template implements BaseNode {
  parent: Statement | null;
  content: string;

  constructor (props: {
    parent: Statement | null;
    content: string;
  }) {
    this.parent = props.parent;
    this.content = props.content;
  }

  toString(): string {
    return this.content;
  }
}
