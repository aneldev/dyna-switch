export interface IDynaSwitchCasesDic<TResult = any> {
  [enumCase: string]: TResult | (() => TResult);
}

export const dynaSwitch = <TResult = any, TTestValue = string | number>(
  testValue: TTestValue,
  defaultValue: TResult | (() => TResult),
  cases: IDynaSwitchCasesDic<TResult>,
): TResult => {
  const result = cases[testValue as any];
  if (typeof result === "function") return (result as any)();
  if (typeof result === "undefined") {
    return  typeof defaultValue === "function" ? (defaultValue as any)() : defaultValue;
  }
  return result;
};
