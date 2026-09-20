import * as TBrush from "../../index.ts";

export const CORE_STATEMENTS: TBrush.StatementFunctionSet = {
  raw({ children }) {
    const string = String(children);
    const template = new TBrush.Template(string);
    return template;
  },

  escape({ children }) {
    const escapes: Record<string, string> = {
      "<": "lt",
      ">": "gt",
      "&": "amp",
      '"': "quot",
      "'": "apos"
    };

    let string = String(children);

    // TODO: resolve before replacing

    for (const char in escapes)
      string = string.replaceAll(char, escapes[char]);

    return new TBrush.Scope();
  },

  with({ children, parameters }, variables) {

    if (!children) return [];
    if (parameters === null) return children;

    const bindings = TBrush.parseExpression(parameters, variables);
    
    children.variables = {
      ...variables,
      ...bindings
    };

    return children;
  },

  if({ children, parameters }, variables) {

    if (!children) return [];
    if (parameters === null) return children;

    const condition = TBrush.parseExpression(parameters, variables);

    const elseStatement = children.getFirstChildStatement("else");
    if (elseStatement) {
      const elseIndex = children.indexOf(elseStatement);

      const trueBody = children.slice(0, elseIndex);
      const falseBody = children.slice(elseIndex + 1);
      
      if (condition)
        return trueBody;
      else
        return falseBody;
    } else {
      if (condition)
        return children;
      else
        return [];
    }
  },

  for({ children, parameters }, variables) {

    if (!children) return [];
    if (parameters === null) return children;
    
    const regex = /^(\S+?)\s+(in|of)\s+(.+)$/;
    const match = parameters.match(regex);

    if (!match) return [];
    
    const [, variableName, keyword ] = match;
    const iterable = TBrush.parseExpression(match[3], variables);

    const nodes: TBrush.Scope[] = [];
    
    switch (keyword) {
      case "in":
        for (const item in iterable)
          iterate(item);
        break;
      
      case "of":
        for (const item of iterable)
          iterate(item);
        break;
    }

    return nodes;
    
    function iterate(value: any) {
      const node = new TBrush.Scope(...children!);
      node.variables = {
        ...variables,
        [variableName]: value
      };
      
      nodes.push(node);
    }
  }
};
