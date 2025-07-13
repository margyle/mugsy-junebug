import { Link, useNavigate } from '@tanstack/react-router';
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
import { authClient, useSession } from '@/lib/auth-client';
import { toast } from 'sonner';

export default function Navbar() {
  const { setTheme } = useTheme();
  const { appName, view } = useNavbarTitle();
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        return; // Don't redirect if server logout failed - security risk
      }

      toast.success('Logged out successfully');
    } catch {
      toast.error('Logout failed - please try again');
      return; // Don't redirect on error - security risk
    }

    navigate({ to: '/login' });
  };

  return (
    <nav className="w-full bg-background/98">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between md:shadow-none shadow-sm">
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
              {/* User greeting in dropdown */}
              {session?.user && (
                <>
                  <DropdownMenuItem disabled>
                    <span className="text-sm font-medium">Hello, {session.user.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}

              <DropdownMenuItem>Profile</DropdownMenuItem>
              {session?.user && (
                <DropdownMenuItem>
                  <Link to="/user-preferences">Preferences</Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>

              {/* Show logout if user is logged in, login if not */}
              {session?.user ? (
                <DropdownMenuItem onClick={handleLogout}>
                  Logout {isPending && '(loading...)'}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Link to="/login" search={{ mobile: undefined }}>
                    Login
                  </Link>
                </DropdownMenuItem>
              )}

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
