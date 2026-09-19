import type { Statement } from "../class/statement.ts";

export interface BaseNode {
  parent: Statement | null;
}
