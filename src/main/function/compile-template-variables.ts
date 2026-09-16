import type { Variables } from "../type/variables.ts";

export function compileTemplateVariables(...variables: Variables[]): Variables {
  const final: Variables = {};

  for (const scope of variables)
    for (const variable in scope)
      final[variable] = scope[variable];
  
  return final;
}
