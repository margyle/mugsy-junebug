import { useTheme } from '@/context/ThemeProvider/ThemeProvider';
import { themes } from '../themeSwitcher/themesList';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Theme: {theme}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themes.map((t) => (
          <DropdownMenuItem key={t} onClick={() => setTheme(t)}>
            {t}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
