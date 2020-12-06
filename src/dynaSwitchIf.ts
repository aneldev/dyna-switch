export type TDynamicValue<T = any> = T | (() => T);

export const dynaSwitchIf = <TResult = any, TTestValue = string | number>(
  testValue: TTestValue,
  defaultValue: TDynamicValue<TResult>,
  cases: { if: TDynamicValue<TTestValue>, then: TDynamicValue<TResult> }[],
): TResult => {
  for (let index = 0; index < cases.length; index++) {
    const scanCase = cases[index];
    const ifValue = typeof scanCase.if === 'function' ? (scanCase.if as any)() : scanCase.if;
    if (testValue === ifValue) {
      return typeof scanCase.then === "function" ? (scanCase.then as any)() : scanCase.then;
    }
  }
  return typeof defaultValue === "function" ? (defaultValue as any)() : defaultValue;
};
