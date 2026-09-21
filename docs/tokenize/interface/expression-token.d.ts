import type { Token } from "./token.ts";
import type { TokenType } from "../enum/token-type.ts";
export interface ExpressionToken extends Token<TokenType.Expression> {
    content: string;
}
//# sourceMappingURL=expression-token.d.ts.map