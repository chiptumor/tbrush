import { BaseNode } from "./base-node.ts";
import type { Scope } from "./scope.ts";
export declare class Statement extends BaseNode {
    keyword: string;
    parameters: string | null;
    children: Scope | null;
    originalText: string;
    constructor(keyword: string, parameters: string | null, children: Scope | null);
    toString(): string;
}
//# sourceMappingURL=statement.d.ts.map