import type { Token } from "./token.ts";
import type { TokenType } from "../enum/token-type.ts";
export interface StatementVoidToken extends Token<TokenType.StatementVoid> {
    keyword: string;
    parameters: string | null;
    originalText: string;
}
//# sourceMappingURL=statement-void-token.d.ts.map