import { useNavigate } from 'react-router-dom';
import { Bell, Search, Sun, Moon, Menu, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { notifications } from '@/lib/mock-data';

function getInitials(name) {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Topbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { setMobileOpen } = useSidebar();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </Button>

      <div className="relative hidden w-full max-w-sm sm:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search vehicles, drivers, trips..." className="pl-8" />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="size-4" />
              {notifications.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-1.5 rounded-full bg-destructive" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-0.5 py-2">
                <span className="text-sm">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-muted">
              <Avatar size="sm">
                <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start leading-tight sm:flex">
                <span className="text-sm font-medium">{user?.fullName}</span>
                {user?.role && (
                  <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                    {user.role}
                  </Badge>
                )}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{user?.fullName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <SettingsIcon /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
