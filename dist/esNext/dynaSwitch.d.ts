export interface IDynaSwitchCasesDic<TResult = any> {
    [enumCase: string]: TResult | (() => TResult);
}
export declare const dynaSwitch: <TResult = any, TTestValue = string | number>(testValue: TTestValue, defaultValue: TResult | (() => TResult), cases: IDynaSwitchCasesDic<TResult>) => TResult;
