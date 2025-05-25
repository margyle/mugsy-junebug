import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Smile, Settings, Bell } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider/theme-provider';
import { themes } from '@/common/themeSwitcher/themesList';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';

export default function Navbar() {
  const { setTheme } = useTheme();
  const { appName, view } = useNavbarTitle();
  console.log(location);

  return (
    <nav className="w-full bg-background ">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-xl font-semibold">
          <span>
            <Link to="/">{appName}</Link>
          </span>
          {view && (
            <>
              <span>: </span>
              <span className="text-primary">{view}</span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Smile className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Examples</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-background/95" sideOffset={10}>
                  <DropdownMenuItem>
                    <Link to="/cats">Cats</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/recipes">Recipes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/examples/table">TanStack Table</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/examples/tanstack-query">TanStack Query</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/examples/jotai">Jotai</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-background/95" sideOffset={10}>
                  {themes.map((t) => (
                    <DropdownMenuItem key={t} onClick={() => setTheme(t)}>
                      {t}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
