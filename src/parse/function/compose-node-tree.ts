import { Expression } from "../class/expression.ts";
import { Scope } from "../class/scope.ts";
import { Statement } from "../class/statement.ts";
import { Template } from "../class/template.ts";
import { TokenType } from "../../tokenize/enum/token-type.ts";
import type { StatementEndToken } from "../../tokenize/interface/statement-end-token.ts";
import type { TokenList } from "../../tokenize/type/token-list.ts";

export function composeNodeTree(
  list: TokenList,
  parent: Statement | null = null
): Scope {
  const tree = new Scope();

  for (let index = 0; index < list.length; index++) {
    const token = list[index];

    switch (token.type) {
      case TokenType.Template:
        const template = new Template(token.content);
        parent && (template.parent = parent);
        tree.push(template);
        break;

      case TokenType.Expression:
        const expression = new Expression(token.content);
        expression.originalText = "{{" + token.content + "}}";
        parent && (expression.parent = parent);
        tree.push(expression);
        break;

      case TokenType.StatementVoid:
        const statementVoid =
          new Statement(token.keyword, token.parameters, null);
        statementVoid.originalText = token.originalText;
        parent && (statementVoid.parent = parent);
        tree.push(statementVoid);
        break;
        
      case TokenType.StatementStart:
        const children: TokenList = [];
        let originalText = token.originalText;
        index++;
        let scope = 0;
        
        while (list[index].type !== TokenType.StatementEnd || scope !== 0) {
          const child = list[index];

          if (child.type === TokenType.Template)
            originalText += child.content;
          else if (child.type === TokenType.Expression)
            originalText += "{{" + child.content + "}}";
          else
            originalText += child.originalText;
          
          if (child.type === TokenType.StatementStart)
            scope++;
          else if (child.type === TokenType.StatementEnd)
            scope--;

          children.push(child);

          index++;

          if (index >= list.length)
            throw new Error("Syntax error: missing statement end node");
        }

        const statementEnd = list[index] as StatementEndToken;

        if (token.keyword !== statementEnd.keyword)
          throw new Error("Syntax error: mismatched statement end node");

        originalText += statementEnd.originalText;

        const statement = new Statement(
          token.keyword,
          token.parameters,
          composeNodeTree(children)
        );
        statement.originalText = originalText;
        parent && (statement.parent = parent);
        tree.push(statement);
        break;
    }
  }

  return tree;
}
