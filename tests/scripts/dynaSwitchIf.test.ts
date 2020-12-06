import "jest";

import {dynaSwitchIf} from "../../src";

interface ITheme {
  color: string;
  backgroundColor: string;
}

const lightTheme: ITheme = {color: 'black', backgroundColor: 'white'};
const darkTheme: ITheme = {color: 'white', backgroundColor: 'black'};
const redTheme: ITheme = {color: 'red', backgroundColor: 'white'};

describe('dynaSwitchIf', () => {

  test('multiple if statements, resolve from function', () => {
    const themeName = 'dark' + '';

    const theme = dynaSwitchIf<ITheme>(
      themeName,
      lightTheme,
      [
        {if: 'light', then: lightTheme},
        {if: 'dark', then: () => darkTheme},
        {if: 'red', then: redTheme},
      ],
    );

    expect(theme.color).toBe('white');
  });

  test('multiple if statements, resolve from value', () => {
    const themeName = 'red' + '';

    const theme = dynaSwitchIf<ITheme>(
      themeName,
      lightTheme,
      [
        {if: 'light', then: lightTheme},
        {if: 'dark', then: () => darkTheme},
        {if: 'red', then: redTheme},
      ],
    );

    expect(theme.color).toBe('red');
  });


});
