import { Statement } from "./statement.ts";
import { Text } from "./text.ts";
import type { CoreNode } from "../type/core-node.ts";
import type { Template } from "../../main/class/template.ts";
import type { Variables } from "../../main/type/variables.ts";
export declare class Scope extends Array<CoreNode> {
    variables: Variables;
    static fromIterable(nodes: Iterable<CoreNode>): Scope;
    static fromString(string: string): Scope;
    getFirstChildStatement(...keywords: string[]): Statement;
    getChildStatements(...keywords: string[]): Statement[];
    resolve(tbrushTemplate: Template, variables?: Variables): Text;
    toString(): string;
}
//# sourceMappingURL=scope.d.ts.map