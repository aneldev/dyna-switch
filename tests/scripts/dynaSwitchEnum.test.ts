import {dynaSwitchEnum} from "../../src";

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


describe('dynaSwitchEnum', () => {
  test('resolve color of ETheme, ITheme', () => {
    expect(dynaSwitchEnum<ETheme, ITheme>(ETheme.LIGHT, themeSetups).color).toBe('black');
    expect(dynaSwitchEnum<ETheme, ITheme>(ETheme.DARK, themeSetups).color).toBe('white');
    expect(dynaSwitchEnum<ETheme, ITheme>(ETheme.REDISH, themeSetups).color).toBe('red');
  });

  test('direct definition of dictionary', () => {
    expect(
      dynaSwitchEnum<ETheme, string>(
        ETheme.REDISH,
        {
          [ETheme.LIGHT]: 'Light',
          [ETheme.DARK]: 'Darky',
          [ETheme.REDISH]: 'Redish',
        },
      ),
    ).toBe('Redish');
  });
});
