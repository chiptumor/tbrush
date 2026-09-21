import type { Variables } from "./variables.ts";
import type { TBrushTemplate } from "../class/tbrush-template.ts";
import type { Statement } from "../../parse/class/statement.ts";
import type { CoreNode } from "../../parse/type/core-node.ts";

export type StatementFunction =
  (context: Statement, variables: Variables, tbrushTemplate: TBrushTemplate)
    => CoreNode | CoreNode[];
