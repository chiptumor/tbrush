import { TBrushTemplate } from "../class/tbrush-template.ts";

export function compose(...args: ConstructorParameters<typeof TBrushTemplate>) {
  return new TBrushTemplate(...args);
}
