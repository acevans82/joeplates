'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeId, ThemeConfig, themes, defaultTheme } from '@/lib/themes';

interface ThemeContextType {
  theme: ThemeId;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeId) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  themeConfig: themes[defaultTheme],
  setTheme: () => {},
  mounted: false,
});

const STORAGE_KEY = 'joeplates-theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): ReactNode {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (stored && themes[stored]) {
      setThemeState(stored);
      document.documentElement.setAttribute('data-theme', stored);
    } else {
      document.documentElement.setAttribute('data-theme', defaultTheme);
    }
  }, []);

  const setTheme = (newTheme: ThemeId): void => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const value: ThemeContextType = {
    theme,
    themeConfig: themes[theme],
    setTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  return context;
}
