import type { NodeType } from "../enum/node-type.ts";

export interface BaseNode<T extends NodeType> {
  type: T;
}
