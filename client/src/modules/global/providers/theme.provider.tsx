import { createContext, useContext, useState } from 'react';
import { ReactProps } from '../types';

type Theme = 'light' | 'dark' | 'neon';

const initialTheme: Theme = 'dark';

const ThemeContext = createContext(
  {} as {
    theme: Theme;
    updateTheme: (newTheme: Theme) => void;
  },
);

export default function ThemeProvider({ children }: ReactProps) {
  const [theme, setTheme] = useState(initialTheme);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  document.getElementById('root')?.classList.add(`${theme}-theme`);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
