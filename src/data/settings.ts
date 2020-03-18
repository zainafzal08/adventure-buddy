import { ThemeKey } from '../data/themes';

export interface Settings {
  theme: ThemeKey;
}

export function defaultSettings() {
  return {
    theme: 'peach' as ThemeKey,
  };
}
