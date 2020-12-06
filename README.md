# dynaSwitch

`dynaSwitch` get the benefits of the javascript's `switch` and get inline the returned value.

# How to Javascript's switch for inline value

Suppose that we have these themes:

```
interface ITheme {
  color: string;
  backgroundColor: string;
}

const lightTheme: ITheme = {color: 'black', backgroundColor: 'white'};
const darkTheme: ITheme = {color: 'white', backgroundColor: 'black'};
const redTheme: ITheme = {color: 'red', backgroundColor: 'white'};
```

We can write this to get the proper theme per string value.

```
const themeName: string = getUIThemeName();

const theme: ITheme = (() => {
  switch (themeName) {      // The value that is going to be tested
    case 'light':           // The cases
      return lightTheme;
    case 'dark':
      return darkTheme;
    case 'red':
      return redTheme;
    default:
      return lightTheme;    // Default value
  }
})();

```

# Meet the `dynaSwitch`

With `dynaSwitch` we can do:

```
const themeName: string = getUIThemeName();

const result = dynaSwitch<ITheme>(
  themeName,                // The value that is going to be tested    
  lightTheme,               // Default value
  {                         // Cases (as object)
    light: lightTheme,
    dark: darkTheme,
    red: () => redTheme,    // The value would be returned by a function also
  },
);
```

Example with enums:

```
export enum ETheme {
  DARK = "DARK",
  LIGHT = "LIGHT",
  RED = "RED",
}

const selectedTheme = ETheme.DARK;

const result = dynaSwitch<ITheme, ETheme>(
  selectedTheme,
  () => lightTheme,             // Default value would be returned by a function
  {
    [ETheme.LIGHT]: lightTheme,
    [ETheme.DARK]: darkTheme,
    [ETheme.RED]: redTheme,
  },
);
```

Benefits

- Organized like javascript `switch`
- Less code, more readable
- It cannot fall through by mistake
- It always returns a value! This is the 2nd argument.
- Under typescript, it is type-safe that will return the expected value.
- The `cases`, the 3rd dictionary argument, would be a reusable and complex object.

# The `dynaSwitch` with functions

In this example, instead of values, we use functions that return the values

This allows having the variable with the same names inside the function, which we cannot do with the classic `switch` _except if you use closures_.

> This is ideal for `Redux reducers` where the switch's cases need to use the same variable names.

```
const themeName: string = getUIThemeName();

const result = dynaSwitch<ITheme>(
  themeName,                // The value that is going to be tested    
  lightTheme,               // Default value
  {                         // Dictionary with the cases
    light: () => {
      const isUserAdmin: boolean = getUserAdmin()
      const theme = {...lightTheme}
      theme.profile.color = 'red';
      return theme;
    },
    dark: () => {
      const isUserAdmin: boolean = getUserAdmin()
      const theme = {...darkTheme}
      theme.profile.color = 'maroom';
      return theme;
    },
    red: () => {
      const isUserAdmin: boolean = getUserAdmin()
      const theme = {...redTheme}
      theme.profile.color = 'pink';
      return theme;
    },
  },
);
```

# Meet the `dynaSwitchIf`

It is like the `dynaSwitch` but, instead of the dictionary, it uses an array of _soft of_ `if` statements, where the 1st valid `if` wins.

This approach makes the `if` compared values be assigned easier instead of being the key to the dictionary.

This `dynaSwitch` works like `if else`.

Example
```
const themeName = 'dark';

const theme = dynaSwitchIf<ITheme>(
  themeName,                                // The value that is going to be tested
  lightTheme,                               // Default value
  [
    {if: 'light', then: lightTheme},
    {if: 'dark', then: () => darkTheme},    // The `then` would be a function
    {if: 'red', then: redTheme},
  ],
);

expect(theme.color).toBe('white');
```

# API

Typescript signatures of the moethods

## dynaSwitch

```
export interface IDynaSwitchCasesDic<TResult = any> {
  [enumCase: string]: TResult | (() => TResult);
}

export const dynaSwitch = <TResult = any, TTestValue = string | number>(
  testValue: TTestValue,
  defaultValue: TResult | (() => TResult),
  cases: IDynaSwitchCasesDic<TResult>,
): TResult

```
## dynaSwitchIf


```
export type TDynamicValue<T = any> = T | (() => T);

export const dynaSwitchIf = <TResult = any, TTestValue = any>(
  testValue: TTestValue,
  defaultValue: TDynamicValue<TResult>,
  cases: { if: TDynamicValue<TTestValue>, then: TDynamicValue<TResult> }[],
): TResult 
```