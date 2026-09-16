type TrustedScriptType = ConstructorParameters<typeof Function>[number];

let func: <T>(script: T) => T | TrustedScriptType;

const trustedTypes = (globalThis as any).trustedTypes;

if (trustedTypes) {
  const policy = trustedTypes.createPolicy("default", {
    createScript: (input: string) => input
  });
  func = (script) => policy.createScript(script);
} else {
  func = (script) => script;
}

export function getTrustedScript(script: string) {
  return func(script);
};
