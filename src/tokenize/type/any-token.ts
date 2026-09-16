import type { ExpressionToken } from "../interface/expression-token.ts";
import type { StatementEndToken } from "../interface/statement-end-token.ts";
import type { StatementStartToken } from "../interface/statement-start-token.ts";
import type { StatementVoidToken } from "../interface/statement-void-token.ts";
import type { TemplateToken } from "../interface/template-token.ts";

export type AnyToken =
  | TemplateToken
  | ExpressionToken
  | StatementStartToken
  | StatementEndToken
  | StatementVoidToken;
