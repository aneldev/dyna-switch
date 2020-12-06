import "jest";
import {dynaSwitch} from "../../src";

interface ITheme {
  color: string;
  backgroundColor: string;
}

export enum ETheme {
  DARK = "DARK",
  LIGHT = "LIGHT",
  RED = "RED",
}

const lightTheme: ITheme = {color: 'black', backgroundColor: 'white'};
const darkTheme: ITheme = {color: 'white', backgroundColor: 'black'};
const redTheme: ITheme = {color: 'red', backgroundColor: 'white'};

describe('dynaSwitch', () => {

  test('dictionary switch', () => {
    const cases = {
      light: lightTheme,
      dark: darkTheme,
      red: redTheme,
    };
    const result = cases['dark'] || cases.light;
    expect(result.color).toBe('white');
  });

  test('plain switch', () => {
    const themNane = 'dark' + '';
    const theme = (() => {
      switch (themNane) {
        case 'light':
          return lightTheme;
        case 'dark':
          return darkTheme;
        case 'red':
          return redTheme;
        default:
          return lightTheme;
      }
    })();
    expect(theme.color).toBe('white');
  });

  test('valid case', () => {
    const result = dynaSwitch<ITheme>(
      'dark',
      lightTheme,
      {
        light: lightTheme,
        dark: darkTheme,
        red: redTheme,
      },
    );
    expect(result.color).toBe('white');
  });

  test('valid case with funcvtion result', () => {
    const result = dynaSwitch<ITheme>(
      'dark',
      lightTheme,
      {
        light: lightTheme,
        dark: () => darkTheme,
        red: redTheme,
      },
    );
    expect(result.color).toBe('white');
  });

  test('valid case with enums', () => {
    const result = dynaSwitch<ITheme, ETheme>(
      ETheme.DARK,
      lightTheme,
      {
        [ETheme.LIGHT]: lightTheme,
        [ETheme.DARK]: darkTheme,
        [ETheme.RED]: redTheme,
      },
    );
    expect(result.color).toBe('white');
  });

  test('default value with function', () => {
    const result = dynaSwitch<ITheme, ETheme>(
      ETheme.LIGHT,
      () => lightTheme,
      {
        [ETheme.DARK]: darkTheme,
        [ETheme.RED]: redTheme,
      },
    );
    expect(result.color).toBe('black');
  });

  test('valid case with function result', () => {
    const result = dynaSwitch<ITheme>(
      'dark',
      lightTheme,
      {
        light: lightTheme,
        dark: () => darkTheme,
        red: redTheme,
      },
    );
    expect(result.color).toBe('white');
  });

  test('invalid case', () => {
    const result = dynaSwitch<ITheme>(
      'darkxxx',
      lightTheme,
      {
        light: lightTheme,
        dark: darkTheme,
        red: redTheme,
      },
    );
    expect(result.color).toBe('black');
    expect(result.backgroundColor).toBe('white');
  });
});
