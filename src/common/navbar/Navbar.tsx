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
export default function Navbar() {
  const { setTheme } = useTheme();

  const appName = 'Mugsy';
  return (
    <nav className="w-full">
      <div className="w-[96%] mx-auto h-16 flex items-center justify-between">
        <div className="text-xl font-semibold">
          {appName}: <a className="text-primary">recipes</a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Smile className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
              {/* routes to navlinks */}
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Examples</DropdownMenuSubTrigger>
                {/* <DropdownMenuSubContent>
                  {routes
                    .filter((route) => route.addToDropdown)
                    .map((route) => (
                      <DropdownMenuItem
                        key={route.label}
                        onClick={() => handleNavigate(route.path)}
                      >
                        {route.label}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent> */}
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link to="/cats">Cats</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/demo/table">TanStack Table</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/demo/tanstack-query">TanStack Query</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/demo/jotai">Jotai</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {themes.map((t) => (
                    <DropdownMenuItem key={t} onClick={() => setTheme(t)}>
                      {t}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
