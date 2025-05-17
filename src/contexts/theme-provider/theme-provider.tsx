import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<{
  theme: string;
  setTheme: (theme: string) => void;
}>({
  theme: 'light',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' && window.localStorage.getItem('theme')
      ? window.localStorage.getItem('theme')!
      : 'light'
  );

  useEffect(() => {
    document.documentElement.className = theme; // Set the theme class on <html>
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
