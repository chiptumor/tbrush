import { Scope } from "../../parse/class/scope.ts";
import type { TBrushConfig } from "../interface/tbrush-config.ts";
import type { StatementCallback } from "../type/statement-callback.ts";
import type { StatementFunctionSet } from "../type/statement-function-set.ts";
import type { TemplateObject } from "../type/template-object.ts";
import type { Variables } from "../type/variables.ts";
export declare class Template {
    #private;
    statementFunctions: StatementFunctionSet;
    constructor(page: string, config?: TBrushConfig);
    addStatements(statements: StatementFunctionSet): void;
    removeStatements(...keywords: string[]): void;
    getStatementCallback(variables: Variables): StatementCallback;
    resolveScope(scope: Scope, variables: Variables): string;
    apply(template: TemplateObject): string;
}
//# sourceMappingURL=template.d.ts.map