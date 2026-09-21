import type { Variables } from "./variables.ts";
import type { Template } from "../class/template.ts";
import type { Statement } from "../../parse/class/statement.ts";
import type { CoreNode } from "../../parse/type/core-node.ts";
export type StatementFunction = (context: Statement, variables: Variables, tbrushTemplate: Template) => CoreNode | CoreNode[];
//# sourceMappingURL=statement-function.d.ts.map