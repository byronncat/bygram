import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactProps } from '../types';

enum Theme {
  light,
  dark,
}

const ThemeContext = createContext(
  {} as {
    setLightTheme: () => void;
    setDarkTheme: () => void;
  },
);

const ThemeProvider = ({ children }: ReactProps) => {
  const [theme, setTheme] = useState(Theme.light);

  const setLightTheme = () => setTheme(Theme.light);
  const setDarkTheme = () => setTheme(Theme.dark);

  useEffect(() => {
    document.documentElement.className = `${Theme[theme]}`;
    document.getElementById('root')!.className = `${Theme[theme]}-theme`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setLightTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
