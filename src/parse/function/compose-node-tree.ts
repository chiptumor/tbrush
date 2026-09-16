import { ExpressionNode } from "../class/expression-node.ts";
import { NodeArray } from "../class/node-array.ts";
import { StatementNode } from "../class/statement-node.ts";
import { TemplateNode } from "../class/template-node.ts";
import { TokenType } from "../../tokenize/enum/token-type.ts";
import type{ StatementEndToken } from "../../tokenize/interface/statement-end-token.ts";
import type { TokenList } from "../../tokenize/type/token-list.ts";

export function composeNodeTree(list: TokenList, parent?: StatementNode): NodeArray {
  const tree = new NodeArray();

  for (let index = 0; index < list.length; index++) {
    const token = list[index];

    switch (token.type) {
      case TokenType.Template:
        tree.push(new TemplateNode({
          parent: parent ?? null,
          content: token.content
        }));
        break;
      case TokenType.Expression:
        tree.push(new ExpressionNode({
          parent: parent ?? null,
          content: token.content
        }));
        break;
      case TokenType.StatementVoid:
        tree.push(new StatementNode({
          parent: parent ?? null,
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

          console.debug(scope, child);
          
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

        tree.push(new StatementNode({
          parent: parent ?? null,
          keyword: token.keyword,
          parameters: token.parameters,
          children: children
        }));

        break;
    }
  }

  return tree;
}
