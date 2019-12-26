interface Theme {
  gradient: string;
  primary: string;
  primaryLight: string;
  primaryShadow: string;
  secondary: string;
  emphasis: string;
  emphasisBackground: string;
  emphasisHigh: string;
  emphasisLow: string;
}

const PEACH_THEME: Theme = {
  gradient: 'linear-gradient(110deg, #f2709c, #ff9472)',
  primary: '#f2709c',
  primaryLight: '#f2709c1a',
  primaryShadow: '#f2709c55',
  secondary: '#ff9472',
  emphasis: '#6cbee6',
  emphasisBackground: '#6cbee60f',
  emphasisHigh: '#6fcf97',
  emphasisLow: '#ed6f6f',
};

const FRESH_THEME: Theme = {
  gradient: 'linear-gradient(110deg, #67b26f, #4ca2cd)',
  primary: '#67b26f',
  primaryLight: '#67b26f1a',
  primaryShadow: '#67b26f55',
  secondary: '#4ca2cd',
  emphasis: '#6cbee6',
  emphasisBackground: '#6cbee60f',
  emphasisHigh: '#6fcf97',
  emphasisLow: '#ed6f6f',
};

export type ThemeName = 'peach' | 'fresh';

export const THEMES: { [x in ThemeName]: Theme } = {
  peach: PEACH_THEME,
  fresh: FRESH_THEME,
};
