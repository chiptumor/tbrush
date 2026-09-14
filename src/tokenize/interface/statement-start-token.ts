import type { Token } from "./token.ts";
import type { TokenType } from "../enum/token-type.ts";

export interface StatementStartToken extends Token<TokenType.StatementStart> {
  keyword: string;
  parameters: string;
}
