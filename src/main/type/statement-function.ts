import type { StatementHelper } from "../class/statement-helper.ts";
import type { StatementNode } from "../../parse/class/statement-node.ts";
import type { NodeArray } from "../../parse/class/node-array.ts";
import type { AnyNode } from "../../parse/type/any-node.ts";

export type StatementFunction =
  (context: StatementNode, helper: StatementHelper) => string | NodeArray | AnyNode[];
