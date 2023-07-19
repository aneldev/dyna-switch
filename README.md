# dynaSwitch

`dynaSwitch` combines the benefits of JavaScript's `switch` statement and allows inline value returns.

# How to use JavaScript's switch statement for inline value

Suppose we have the following themes:

```typescript
interface ITheme {
  color: string;
  backgroundColor: string;
}

const lightTheme: ITheme = {color: 'black', backgroundColor: 'white'};
const darkTheme: ITheme = {color: 'white', backgroundColor: 'black'};
const redTheme: ITheme = {color: 'red', backgroundColor: 'white'};
```

We can write the following code to obtain the appropriate theme based on a string value:

```typescript
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

# Introducing `dynaSwitch`

With `dynaSwitch`, we can achieve the same result in a more concise manner:

```typescript
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

**Benefits**

- Organized like JavaScript's `switch` statement
- Less code, more readable
- Prevents accidental fall-through cases
- Always returns a value (the second argument serves as the default value)
- Provides type safety in TypeScript, ensuring the expected value is returned
- The `cases` dictionary argument can be reused and can handle more complex objects.

# Using `dynaSwitch` with functions

In this example, we utilize functions instead of values in the `dynaSwitch` cases. This allows us to have variables with the same names inside the functions, something not possible with the traditional `switch` statement unless closures are used. This feature is particularly useful in `Redux reducers`, where the cases often require the use of the same variable names.

```typescript
const themeName: string = getUIThemeName();

const result = dynaSwitch<ITheme>(
  themeName,                // The value that is going to be tested    
  lightTheme,               // Default value
  {                         // Dictionary with the cases
    light: () => {
      const isUserAdmin: boolean = getUserAdmin();
      const theme = { ...lightTheme };
      theme.profile.color = 'red';
      return theme;
    },
    dark: () => {
      const isUserAdmin: boolean = getUserAdmin();
      const theme = { ...darkTheme };
      theme.profile.color = 'maroon';
      return theme;
    },
    red: () => {
      const isUserAdmin: boolean = getUserAdmin();
      const theme = { ...redTheme };
      theme.profile.color = 'pink';
      return theme;
    },
  },
);
```

# Introducing `dynaSwitchEnum`

With `dynaSwitchEnum`, you can easily achieve super type-safe values for each option of an Enum, thanks to TypeScript's internal `Record` feature. This means that if the Enum is modified in the future, you will receive TypeScript errors during compilation for any missing or modified Enum options.

```typescript
enum ETheme {
  DARK = "DARK",
  LIGHT = "LIGHT",
  REDISH = "REDISH",
}

interface ITheme {
  color: string;
  backgroundColor: string;
}

const themeSetups: Record<ETheme, ITheme> = {
  [ETheme.LIGHT]: {
    color: 'black', backgroundColor: 'white',
  },
  [ETheme.DARK]: {
    color: 'white', backgroundColor: 'black',
  },
  [ETheme.REDISH]: {
    color: 'red', backgroundColor: 'white',
  },
};

dynaSwitchEnum<ETheme, ITheme>(ETheme.LIGHT, themeSetups).color; // returns "black"

dynaSwitchEnum<ETheme, ITheme>("something", themeSetups).color; // not compilable, due to TS!

```

Alternatively, you can define the dictionary directly. This is especially helpful when you want to convert an enum to a React component prop.

```
dynaSwitchEnum<ETheme, string>(
  ETheme.REDISH,
  {
    [ETheme.LIGHT]: 'Light',
    [ETheme.DARK]: 'Darky',
    [ETheme.REDISH]: 'Redish',
  },
); // This returns "Redish"!
```

**Benefits**

- Provides super type safety for both the Enum and the returned value
- Always returns a value

# Introducing `dynaSwitchIf`

`dynaSwitchIf` is similar to `dynaSwitch`, but instead of using a dictionary, it employs an array of "if" statements. The first valid "if" statement is executed. This approach makes it easier to assign values compared to using keys in a dictionary.

This `dynaSwitch` implementation works like an "if-else" statement.

Example:

```typescript
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

TypeScript signatures of the methods:

## dynaSwitch

```typescript
export interface IDynaSwitchCasesDic<TResult = any> {
  [enumCase: string]: TResult | (() => TResult);
}

export const dynaSwitch = <TResult = any, TTestValue = string | number>(
  testValue: TTestValue,
  defaultValue: TResult | (() => TResult),
  cases: IDynaSwitchCasesDic<TResult>,
) => TResult;
```

## dynaSwitchEnum

```typescript
export const dynaSwitchEnum = <TEnum extends string | number | symbol, TResult>(
  testValue: TEnum,
  cases: Record<TEnum, TResult>,
) => TResult;
```

## dynaSwitchIf

```typescript
export type TDynamicValue<T = any> = T | (() => T);

export const dynaSwitchIf = <TResult = any, TTestValue = any>(
  testValue: TTestValue,
  defaultValue: TDynamicValue<TResult>,
  cases: { if: TDynamicValue<TTestValue>; then: TDynamicValue<TResult> }[],
) => TResult;
```
