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
        tree.push(new Template({
          parent: parent,
          content: token.content
        }));
        break;
      case TokenType.Expression:
        tree.push(new Expression({
          parent: parent,
          content: token.content
        }));
        break;
      case TokenType.StatementVoid:
        tree.push(new Statement({
          parent: parent,
          keyword: token.keyword,
          parameters: token.parameters,
          children: null
        }));
        break;
      case TokenType.StatementStart:
        const children: TokenList = [];
        index++;
        let scope = 0;
        
        while (list[index].type !== TokenType.StatementEnd || scope !== 0) {
          const child = list[index];
          
          if (child.type === TokenType.StatementStart)
            scope++;
          else if (child.type === TokenType.StatementEnd) {
            scope--;
          }

          children.push(child);

          index++;

          if (index >= list.length)
            throw new Error("Syntax error: missing statement end node");
        }

        if (token.keyword !== (list[index] as StatementEndToken).keyword)
          throw new Error("Syntax error: mismatched statement end node");

        tree.push(new Statement({
          parent: parent,
          keyword: token.keyword,
          parameters: token.parameters,
          children: children
        }));

        break;
    }
  }

  return tree;
}
