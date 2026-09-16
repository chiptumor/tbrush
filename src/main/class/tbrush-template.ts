import { CORE_STATEMENTS } from "../const/core-statements.ts";
import { NodeArray } from "../../parse/class/node-array.ts";
import { composeNodeTree } from "../../parse/function/compose-node-tree.ts";
import { composeTokenList } from "../../tokenize/function/compose-token-list.ts";
import type { TBrushConfig } from "../interface/tbrush-config.ts";
import type { StatementFunctionSet } from "../type/statement-function-set.ts";
import type { TemplateObject } from "../type/template-object.ts";

export class TBrushTemplate {
  #tree: NodeArray;
  
  #config: TBrushConfig | undefined;

  #statementConfig: StatementFunctionSet = {
    ...CORE_STATEMENTS
  };

  statements = {
    add: (statements: StatementFunctionSet) => {
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

    const list = composeTokenList(page);
    this.#tree = composeNodeTree(list);
  }

  apply(template: TemplateObject) {

  }
}
