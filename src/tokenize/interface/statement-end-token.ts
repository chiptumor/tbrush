import type { Token } from "./token.ts";
import type { TokenType } from "../enum/token-type.ts";

export interface StatementEndToken extends Token<TokenType.StatementEnd> {
  keyword: string;
}
