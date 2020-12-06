export interface IDynaSwitchCasesDic<TResult = any> {
  [enumCase: string]: TResult | (() => TResult);
}

export const dynaSwitch = <TResult = any>(
  testValue: string,
  default_: TResult,
  cases: IDynaSwitchCasesDic<TResult>,
): TResult => {
  const result = cases[testValue as any];
  if (typeof result === "function") return (result as any)();
  if (typeof result === "undefined") return default_;
  return result;
};
