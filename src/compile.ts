namespace TBrush {
  //#region const

  const TBRUSH_REGEX = /\{\{(.+?)\}\}/gs;
  
  const STATEMENT_REGEX = /^@(.+)/;
  
  // group 1 (\w+): keyword
  // group 2 (.*?): parameters
  const STATEMENT_START_REGEX = /^(\w+)\s(?:\((.*?)\))?$/;
  // group 1 (\w+): keyword
  const STATEMENT_END_REGEX = /^\/(\w+)/;

  const CORE_STATEMENTS: Record<string, TBrushStatementFunction> = {
    if(context, parameters, body) {
      return "";
    },
    else(context, parameters, body) {
      return "";
    },
    elseif(context, parameters, body) {
      return "";
    },

    for(context, parameters, body) {
      return "";
    }
  };

  const CONTEXT = null;
  type CONTEXT_TYPE = typeof CONTEXT;
  
  //#region token list
  
  enum TokenType {
    Template,
    Expression,
    StatementStart,
    StatementEnd
  }
  
  interface TemplateToken {
    type: TokenType.Template;
    content: string;
  }
  
  interface ExpressionToken {
    type: TokenType.Expression;
    content: string;
  }
  
  interface StatementStartToken {
    type: TokenType.StatementStart;
    keyword: string;
    parameters: string;
  }
  
  interface StatementEndToken {
    type: TokenType.StatementEnd;
    keyword: string;
  }
  
  type Token =
    | TemplateToken
    | ExpressionToken
    | StatementStartToken
    | StatementEndToken;
  
  type TokenList = Token[];
  
  function composeTokenList(
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
  
  //#region node tree
  
  enum NodeType {
    Template,
    Expression,
    Statement
  }
  
  interface TemplateNode {
    type: NodeType.Template;
    content: string;
  }
  
  interface ExpressionNode {
    type: NodeType.Expression;
    content: string;
  }
  
  interface StatementNode {
    type: NodeType.Statement;
    keyword: string;
    parameters: string;
    children: NodeTree;
  }
  
  type TreeNode = TemplateNode | ExpressionNode | StatementNode;
  
  type NodeTree = TreeNode[];
  
  function composeNodeTree(list: TokenList): NodeTree {
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
  
  //#region main

  export interface TBrushConfig {
    syntax?: {
      tbrush?: RegExp;
      statement?: RegExp;
      statementStart?: RegExp;
      statementEnd?: RegExp;
    };
  }

  export type TBrushObject = Record<string, any>;

  export type TBrushStatementFunction =
    (context: CONTEXT_TYPE, parameters: string, body: string) => string;

  export class TBrushTemplate {
    #tree: NodeTree;
    
    #config: TBrushConfig | undefined;

    #statementConfig: Record<string, TBrushStatementFunction> = {
      ...CORE_STATEMENTS
    };

    statements = {
      add: (statements: Record<string, TBrushStatementFunction>) => {
        for (const keyword in statements)
          this.#statementConfig[keyword] = statements[keyword];
      },
      remove: (...keywords: string[]) => {
        for (const keyword of keywords)
          delete this.#statementConfig[keyword];
      }
    };

    constructor (page: string, config?: TBrushConfig) {
      this.#config = config;

      const list = composeTokenList(page, config?.syntax);
      this.#tree = composeNodeTree(list);
    }

    apply(template: TBrushObject) {

    }
  }
}

// TEST

const _testPages: [ string, Record<string, any> ][] = [
  [
    `
<ul>
  {{@for (blinky of blinkies) }}
    <li><a href="{{ blinky.href }}">
      <img src="{{ blinky.img }}" />
    </a></li>
  {{@/for}}
</ul>
    `.trim(),
    { blinkies: [
      { href: "https://blinky.com/1", img: "/res/blinky/1.png" },
      { href: "https://blinky.com/2", img: "/res/blinky/2.png" }
    ]}
  ]
];

_testPages.forEach(i => console.log(new TBrush.TBrushTemplate(i[0])));
