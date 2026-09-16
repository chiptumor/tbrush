import { getTrustedScript } from "./get-trusted-script.ts";
import type { Variables } from "../type/variables.ts";

export function parseExpression(
  expression: string,
  variables: Variables
): any {
  const string = `return (${expression});`;
  const script = getTrustedScript(string);
  try {
    const func = new Function(...Object.keys(variables), script);
    return func(...Object.values(variables));
  } catch (error) {
    return error;
  }
}
