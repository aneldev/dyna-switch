export interface IDynaSwitchCasesDic<TResult = any> {
    [enumCase: string]: TResult | (() => TResult);
}
export declare const dynaSwitch: <TResult = any>(testValue: string, default_: TResult, cases: IDynaSwitchCasesDic<TResult>) => TResult;
