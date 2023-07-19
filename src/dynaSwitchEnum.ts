export const dynaSwitchEnum = <TEnum extends string | number | symbol, TResult>(
  testValue: TEnum,
  cases: Record<TEnum, TResult>,
): TResult => cases[testValue as any];
