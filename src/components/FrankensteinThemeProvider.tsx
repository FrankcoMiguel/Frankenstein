import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from 'react';
import type { ColorTheme, ColorThemeName } from '../types/frankenstein';

const colorThemes: Record<ColorThemeName, ColorTheme> = {
  neon: {
    primary: '#39ff14',
    secondary: '#00ffff',
    accent: '#ff006e',
    background: '#050505',
    text: '#ffffff',
    glow: '#39ff14',
  },
  cyber: {
    primary: '#00ff00',
    secondary: '#ffff00',
    accent: '#ff0080',
    background: '#0a0a0a',
    text: '#00ff00',
    glow: '#00ff00',
  },
  synthwave: {
    primary: '#ff006e',
    secondary: '#00d9ff',
    accent: '#ffbe0b',
    background: '#0a0015',
    text: '#ffffff',
    glow: '#ff006e',
  },
};

interface FrankensteinThemeContextType {
  theme: ColorTheme;
  themeName: ColorThemeName;
  switchTheme: (theme: ColorThemeName) => void;
  availableThemes: ColorThemeName[];
}

const FrankensteinThemeContext = createContext<FrankensteinThemeContextType | undefined>(undefined);

interface FrankensteinThemeProviderProps {
  children: ReactNode;
  initialTheme?: ColorThemeName;
}

export const FrankensteinThemeProvider = ({
  children,
  initialTheme = 'neon',
}: FrankensteinThemeProviderProps) => {
  const [themeName, setThemeName] = useState<ColorThemeName>(initialTheme);

  const theme = colorThemes[themeName];
  const availableThemes = Object.keys(colorThemes) as ColorThemeName[];

  const value = useMemo(
    () => ({
      theme,
      themeName,
      switchTheme: setThemeName,
      availableThemes,
    }),
    [theme, themeName]
  );

  // Apply theme variables to document
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
  }, [theme]);

  return (
    <FrankensteinThemeContext.Provider value={value}>
      {children}
    </FrankensteinThemeContext.Provider>
  );
};

export const useFrankensteinTheme = () => {
  const context = useContext(FrankensteinThemeContext);
  if (!context) {
    throw new Error(
      'useFrankensteinTheme must be used within FrankensteinThemeProvider'
    );
  }
  return context;
};

// Standalone color theme object
export { colorThemes };
export type { ColorTheme, ColorThemeName };
