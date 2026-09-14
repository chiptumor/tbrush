import { NodeType } from "../enum/node-type.ts";
import { TokenType } from "../../tokenize/enum/token-type.ts";
import type { NodeTree } from "../type/node-tree.ts";
import type { TokenList } from "../../tokenize/type/token-list.ts";

export function composeNodeTree(list: TokenList): NodeTree {
  const tree: NodeTree = [];

  for (let index = 0; index < list.length; index++) {
    const token = list[index];

    switch (token.type) {
      case TokenType.Template:
        tree.push({
          type: NodeType.Template,
          content: token.content
        });
        break;
      case TokenType.Expression:
        tree.push({
          type: NodeType.Expression,
          content: token.content
        });
        break;
      case TokenType.StatementStart:
        const children: TokenList = [];
        let scope = 0;
        index++;

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
            scope--;

          children.push(child);

          index++;
        }

        tree.push({
          type: NodeType.Statement,
          keyword: token.keyword,
          parameters: token.parameters,
          children: composeNodeTree(children)
        });

        break;
      case TokenType.StatementEnd:
        throw "unreachable";
        // `TokenType.StatementEnd` should never be `token`'s type given the
        // loop
    }
  }

  return tree;
}
