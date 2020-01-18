interface Theme {
  gradient: string;
  primary: string;
  primaryLight: string;
  primaryMedium: string;
  primaryShadow: string;
  primaryShadowHigh: string;
  secondary: string;
  emphasis: string;
  emphasisBackground: string;
  emphasisHigh: string;
  emphasisLow: string;
  emphasisShadow: string;
  emphasisShadowHigh: string;
}

const PEACH_THEME: Theme = {
  gradient: 'linear-gradient(110deg, #f2709c, #ff9472)',
  primary: '#f2709c',
  primaryLight: '#f2709c1a',
  primaryMedium: '#f2709c55',
  primaryShadow: '1px 2px 4px #f2709c55',
  primaryShadowHigh: '3px 3px 11px #f2709c95',
  secondary: '#ff9472',
  emphasis: '#6cbee6',
  emphasisBackground: '#6cbee60f',
  emphasisHigh: '#6fcf97',
  emphasisLow: '#ed6f6f',
  emphasisShadow: '1px 2px 4px #6cbee655',
  emphasisShadowHigh: '0px 4px 3px #6cbee685',
};

const FRESH_THEME: Theme = {
  gradient: 'linear-gradient(110deg, #67b26f, #4ca2cd)',
  primary: '#67b26f',
  primaryLight: '#67b26f1a',
  primaryMedium: '#67b26f55',
  primaryShadow: '1px 2px 4px #67b26f55',
  primaryShadowHigh: '3px 3px 11px #67b26f95',
  secondary: '#4ca2cd',
  emphasis: '#6cbee6',
  emphasisHigh: '#6fcf97',
  emphasisLow: '#ed6f6f',
  emphasisBackground: '#6cbee60f',
  emphasisShadow: '1px 2px 4px #6cbee655',
  emphasisShadowHigh: '3px 3px 11px #6cbee695',
};

export type ThemeName = 'peach' | 'fresh';

export const THEMES: { [x in ThemeName]: Theme } = {
  peach: PEACH_THEME,
  fresh: FRESH_THEME,
};
