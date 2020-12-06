import "jest";
import {dynaSwitch} from "../../src";

interface ITheme {
  color: string;
  backgroundColor: string;
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
