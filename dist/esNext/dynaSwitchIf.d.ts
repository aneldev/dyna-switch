export declare type TDynamicValue<T = any> = T | (() => T);
export declare const dynaSwitchIf: <TResult = any, TTestValue = any>(testValue: TTestValue, defaultValue: TDynamicValue<TResult>, cases: {
    if: TDynamicValue<TTestValue>;
    then: TDynamicValue<TResult>;
}[]) => TResult;
