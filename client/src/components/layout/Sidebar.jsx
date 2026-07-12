import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Truck,
  IdCard,
  Route,
  Wrench,
  Fuel,
  Receipt,
  BarChart3,
  Sparkles,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuth } from '@/contexts/AuthContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Vehicles', to: '/vehicles', icon: Truck },
  { label: 'Drivers', to: '/drivers', icon: IdCard },
  { label: 'Trips', to: '/trips', icon: Route },
  { label: 'Maintenance', to: '/maintenance', icon: Wrench },
  { label: 'Fuel Logs', to: '/fuel-logs', icon: Fuel },
  { label: 'Expenses', to: '/expenses', icon: Receipt },
  { label: 'Reports', to: '/reports', icon: BarChart3 },
  { label: 'AI Fleet Assistant', to: '/ai-assistant', icon: Sparkles },
];

const SETTINGS_ITEM = { label: 'Settings', to: '/settings', icon: Settings };

function BrandMark({ collapsed }) {
  return (
    <div className="flex h-14 shrink-0 items-center gap-2 px-4">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
        T
      </div>
      {!collapsed && <span className="font-heading text-sm font-semibold tracking-tight">TransitOps</span>}
    </div>
  );
}

function NavItem({ item, collapsed, onNavigate }) {
  const link = (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          collapsed && 'justify-center px-0',
          isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
        )
      }
    >
      <item.icon className="size-4 shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

function SidebarNav({ collapsed, onNavigate }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const logoutButton = (
    <button
      type="button"
      onClick={handleLogout}
      className={cn(
        'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        collapsed && 'justify-center px-0',
      )}
    >
      <LogOut className="size-4 shrink-0" />
      {!collapsed && <span>Logout</span>}
    </button>
  );

  return (
    <div className="flex h-full flex-col">
      <BrandMark collapsed={collapsed} />
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-2">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} item={item} collapsed={collapsed} onNavigate={onNavigate} />
        ))}
      </nav>
      <div className="flex flex-col gap-1 border-t border-sidebar-border px-2 py-2">
        <NavItem item={SETTINGS_ITEM} collapsed={collapsed} onNavigate={onNavigate} />
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>{logoutButton}</TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        ) : (
          logoutButton
        )}
      </div>
    </div>
  );
}

export function Sidebar() {
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      <aside
        className={cn(
          'relative hidden shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:flex',
          collapsed ? 'w-16' : 'w-60',
        )}
      >
        <SidebarNav collapsed={collapsed} />
        <button
          type="button"
          onClick={toggleCollapsed}
          className="absolute -right-3 top-14 flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm hover:text-foreground"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronsRight className="size-3.5" /> : <ChevronsLeft className="size-3.5" />}
        </button>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarNav collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
