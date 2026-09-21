import type { Statement } from "./statement.ts";

export class BaseNode {
  #parent: Statement | null = null;

  set parent(parent: Statement | null) {
    if (parent && !parent.children) return;

    if (this.#parent) {
      const index = this.#parent.children!.findIndex(i => i === this as any);
      this.#parent.children!.splice(index, 1);
    }

    if (!parent) {
      this.#parent = null;
      return;
    }

    parent.children!.push(this as any);
    this.#parent = parent;
  }

  get parent(): Statement | null {
    return this.#parent;
  }
}
