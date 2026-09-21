import { Template } from "../class/template.ts";

export function compose(...args: ConstructorParameters<typeof Template>) {
  return new Template(...args);
}
