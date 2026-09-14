import { TokenType } from "../enum/token-type.ts";
import type { TokenList } from "../type/token-list.ts";

const TBRUSH_REGEX = /\{\{(.+?)\}\}/gs;

const STATEMENT_REGEX = /^@(.+)/;

// group 1 (\w+): keyword
// group 2 (.*?): parameters
const STATEMENT_START_REGEX = /^(\w+)\s(?:\((.*?)\))?$/;
// group 1 (\w+): keyword
const STATEMENT_END_REGEX = /^\/(\w+)/;


export function composeTokenList(
  page: string,
  syntax?: {
    tbrush?: RegExp;
    statement?: RegExp;
    statementStart?: RegExp;
    statementEnd?: RegExp;
  }
): TokenList {
  const templates = page
    .split(syntax?.tbrush ?? TBRUSH_REGEX);
  
  const tokenList: TokenList = [];

  for (let index = 1; index < templates.length; index += 2) {
    tokenList.push({
      type: TokenType.Template,
      content: templates[index - 1]
    });

    const statement = templates[index]
      .match(syntax?.statement ?? STATEMENT_REGEX)
      ?.[1].trim();
    if (!statement) {
      tokenList.push({
        type: TokenType.Expression,
        content: templates[index]
      });

      continue;
    }

    const statementEnd = statement
      .match(syntax?.statementEnd ?? STATEMENT_END_REGEX);
    if (statementEnd) {
      tokenList.push({
        type: TokenType.StatementEnd,
        keyword: statementEnd[1]
      });

      continue;
    }

    const statementStart = statement
      .match(syntax?.statementStart ?? STATEMENT_START_REGEX);
    if (!statementStart) {
      throw Error("Invalid statement TBrush!");
    }

    tokenList.push({
      type: TokenType.StatementStart,
      keyword: statementStart[1],
      parameters: statementStart[2]
    });
  }

  tokenList.push({
    type: TokenType.Template,
    content: templates.pop()!
    // `string#split()` will always return an array with at least one element
  });

  return tokenList;
}
