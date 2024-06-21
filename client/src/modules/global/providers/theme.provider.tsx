import { createContext, useContext, useEffect } from 'react';
import { useTernaryDarkMode } from 'usehooks-ts';
import { LocalStorageKey } from '../constants';
import type { ReactProps } from '../types';

type TernaryDarkMode = ReturnType<typeof useTernaryDarkMode>['ternaryDarkMode'];

const ThemeContext = createContext(
  {} as {
    theme: TernaryDarkMode;
    setTheme: (theme: TernaryDarkMode) => void;
    setLightTheme: () => void;
    setDarkTheme: () => void;
    setSystemTheme: () => void;
    isDarkMode: boolean;
  },
);

const ThemeProvider = ({ children }: ReactProps) => {
  const { isDarkMode, ternaryDarkMode, setTernaryDarkMode } =
    useTernaryDarkMode({
      localStorageKey: LocalStorageKey.Theme,
    });

  const setLightTheme = () => {
    setTernaryDarkMode('light' as TernaryDarkMode);
  };
  const setDarkTheme = () => {
    setTernaryDarkMode('dark' as TernaryDarkMode);
  };
  const setSystemTheme = () => {
    setTernaryDarkMode('system' as TernaryDarkMode);
  };

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.className = theme;
    document.getElementById('root')!.className = `${theme}-theme`;
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme: ternaryDarkMode,
        setTheme: setTernaryDarkMode,
        setLightTheme,
        setDarkTheme,
        setSystemTheme,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
