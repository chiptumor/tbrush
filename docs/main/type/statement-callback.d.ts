import type { Variables } from "./variables";
import type { Statement } from "../../parse/class/statement";
import type { CoreNode } from "../../parse/type/core-node";
export type StatementCallback = (statement: Statement, variables: Variables) => CoreNode | CoreNode[];
//# sourceMappingURL=statement-callback.d.ts.map