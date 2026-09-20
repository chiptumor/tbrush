import { Statement } from "../class/statement.ts";

export class BaseNode {
  #parent: Statement | null = null;

  set parent(parent: Statement | null) {
    if (parent instanceof Statement && !parent.children) return;

    if (this.#parent) {
      const index = this.#parent.children!.findIndex(i => i === this.#parent);
      this.#parent.children!.splice(index, 1);
    }

    if (!parent) {
      this.#parent = null;
      return;
    }

    parent.children!.push(this);
    this.#parent = parent;
  }

  get parent(): Statement | null {
    return this.#parent;
  }
}
