import type { Token } from "./token.ts";
import type { TokenType } from "../enum/token-type.ts";

export interface TemplateToken extends Token<TokenType.Template> {
  content: string;
}
