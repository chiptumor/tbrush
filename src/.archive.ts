namespace TBrush {
  //#region const

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
  
  //#region main

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
