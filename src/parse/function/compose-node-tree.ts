import { ExpressionNode } from "../class/expression-node.ts";
import { NodeArray } from "../class/node-array.ts";
import { StatementNode } from "../class/statement-node.ts";
import { TemplateNode } from "../class/template-node.ts";
import { NodeType } from "../enum/node-type.ts";
import { TokenType } from "../../tokenize/enum/token-type.ts";
import type { RootNode } from "../type/root-node.ts";
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
      case TokenType.StatementStart:
        const children: TokenList = [];
        index++;
        let scope = 0;
        
        while (
          index < list.length
          && (
            list[index].type !== TokenType.StatementEnd
            || scope !== 0
          )
        ) {
          const child = list[index];
          
          if (child.type === TokenType.StatementStart)
            scope++;
          else if (child.type === TokenType.StatementEnd)
            if (child.keyword == token.keyword)
              scope--;
            else
              throw new Error("Syntax error: mismatched statemend end node");

          children.push(child);

          index++;
        }

        tree.push(new StatementNode({
          parent: parent ?? null,
          keyword: token.keyword,
          parameters: token.parameters,
          children: composeNodeTree(children)
        }));

        break;
    }
  }

  return tree;
}
