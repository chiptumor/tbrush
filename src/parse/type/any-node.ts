import type { ExpressionNode } from "../class/expression-node.ts";
import type { StatementNode } from "../class/statement-node.ts";
import type { TemplateNode } from "../class/template-node.ts";

export type AnyNode = TemplateNode | ExpressionNode | StatementNode;
